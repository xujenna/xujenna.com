async function getData() {
  let data = await d3.json('./data/db_data.json');
  let documentation = await d3.json('./data/doc_data.json');
  data['documentation'] = documentation;

  let danceTracks = await d3.json('./data/exercises.json');
  data['lookup'] = {};
  data['lookup']['danceTracks'] = danceTracks['danceTracks'];

  let scriptLookup = await d3.json('./data/script_lookup.json');
  data['lookup']['scripts'] = scriptLookup;

  // let gratitudeLog = await d3.json('./data/gratitude.json');

  // gratitudeLog.forEach((d) => {
  //   d.gratitude_entries.forEach((entry) => {
  //     data.documentation.push(entry);
  //   });
  // });
  return data;
}

getData().then(function (data) {
  let databases = Object.keys(data);
  databases.splice(Object.keys(data).indexOf('lookup'), 1);
  databases.forEach((key) => {
    data[key] = data[key].filter((d) => d.timestamp > 1555164021 && d.timestamp < 1556965804);
    data[key] = data[key].map((d) => {
      d.timestamp = d.timestamp * 1000;
      return d;
    });
    data[key] = data[key].reverse();
  });

  //   console.log(data);

  // let sleepHrs = [22, 23, 24, 0, 1, 2, 3, 4, 5];
  // let wakeHrs = [7, 8, 9, 10, 11, 12, 13, 14, 15];
  let nullItems = [];
  // let firstDay = [
  //   new Date(data.predictions[0].timestamp).setHours(10),
  //   new Date(data.predictions[0].timestamp).setDate(new Date(data.predictions[0].timestamp).getDate() + 1).setHours(5),
  // ];
  data.predictions.forEach((d, i, obj) => {
    d['mean_deltas'] = {};
    // d.timestamp is the later time
    // i+1 is earlier
    let currentDay = new Date(d.timstamp).getDate();
    let currentMonth = new Date(d.timestamp);
    if (
      d.timestamp !== null &&
      i < obj.length - 1 &&
      // sleepHrs.includes(new Date(d.timestamp).getHours()) &&
      // wakeHrs.includes(new Date(data['predictions'][i + 1].timestamp).getHours())
      new Date(d.timestamp).getHours() >= 7 &&
      new Date(data['predictions'][i + 1].timestamp).getHours() <= 5
      // d.timestamp > data['predictions'][i + 1].timestamp + 60 * 60 * 5 * 1000
    ) {
      let nullObj = {};
      nullObj['LSTM_mood_prediction'] = null;
      nullObj['LSTM_morale_prediction'] = null;
      nullObj['LSTM_stress_prediction'] = null;
      nullObj['LSTM_fatigue_prediction'] = null;
      nullObj['timestamp'] = null;
      obj.splice(i + 1, 0, nullObj);
      nullItems.push(i + 1);
    }
  });

  let oldThresholds = {
    fatigue: 3.05,
    stress: 1.3,
    morale: 2.9,
    mood: 2.8,
  };

  let allKeys = Object.keys(data['predictions'][0]);
  let keys = allKeys.filter((key) => {
    return key !== 'runningMean' && key !== 'timestamp' && key !== 'mean_deltas';
  });

  data.predictions.forEach((d, i, obj) => {
    d['mean_deltas'] = {};

    keys.forEach((key) => {
      let marker = key.replace('LSTM_', '').replace('_prediction', '');

      if (d[key] == null) {
        d['mean_deltas'][marker + '_mean_delta'] = null;
      } else if (d['runningMean']) {
        let meanKey = 'total' + (marker.charAt(0).toUpperCase() + marker.slice(1)) + 'Pred';
        if (marker == 'mood' || key == 'morale') {
          d['mean_deltas'][marker + '_mean_delta'] =
            (d[key] - d['runningMean'][meanKey] / d['runningMean']['totalPredictions']) * -1;
        } else {
          d['mean_deltas'][marker + '_mean_delta'] =
            d[key] - d['runningMean'][meanKey] / d['runningMean']['totalPredictions'];
        }
      } else if (d[key]) {
        if (marker == 'mood' || key == 'morale') {
          d['mean_deltas'][marker + '_mean_delta'] = (d[key] - oldThresholds[marker]) * -1;
        } else {
          d['mean_deltas'][marker + '_mean_delta'] = d[key] - oldThresholds[marker];
        }
      }
    });
  });

  data.interventions.forEach((intervention) => {
    let timestamp = intervention.timestamp;

    data.predictions.forEach((prediction) => {
      if (prediction.timestamp == timestamp) {
        intervention['mean_delta'] = prediction['mean_deltas'][intervention.marker + '_mean_delta'];
      }
    });
  });

  let nullIndex = 0;
  let currentPredictions = data.predictions.slice(0, nullItems[nullIndex] + 1);
  // console.log(currentPredictions)

  let margin = { top: 75, right: 100, bottom: 60, left: 100 };
  let width = window.innerWidth * 0.8;
  let height = currentPredictions.length * 90;
  let axisWidth = width * 0.45;

  let chartSVG = d3
    .select('#charts')
    .attr('height', height + margin.top + margin.bottom + 'px')
    .attr('width', width + margin.right + margin.left + 'px');

  let yScale = d3
    .scaleTime()
    .domain([currentPredictions[0]['timestamp'], currentPredictions[currentPredictions.length - 2]['timestamp']])
    .range([height - margin.bottom, margin.top]);

  let xScale = d3
    .scaleLinear()
    // .domain([d3.min(data.predictions, d => d.LSTM_morale_prediction),d3.max(data.predictions, d=> d.LSTM_stress_prediction)])
    .domain([-0.75, 2])
    .range([margin.left, axisWidth]);

  let xTicks = d3
    .axisTop(xScale)
    .tickValues([-0.75, 0, 2])
    .tickFormat((d) => {
      if (d == 0) {
        return 'baseline mood';
      } else if (d > 0) {
        return 'worse';
      } else if (d == -0.75) {
        return 'better';
      }
    })
    .tickSizeOuter(0)
    .tickPadding(45)
    .tickSize(0);

  let formatDate = d3.timeFormat('%b %d, %I %p');
  let formatTime = d3.timeFormat('%I %p');
  let yTicks = d3
    .axisLeft(yScale)
    .ticks(d3.timeHour.every(2))
    .tickSizeOuter(0)
    .tickPadding(10)
    .tickSizeInner(xScale(-0.75))
    // .tickSizeInner(axisWidth / 2 - margin.left)
    .tickFormat((d, i, j) => {
      if (i == j.length - 1 || formatTime(d) == '12 AM') {
        return formatDate(d).toLowerCase();
      } else {
        return formatTime(d).toLowerCase();
      }
      // return this.parentNode.nextSibling
      //     ? d
      //     : formatDate(d)
    });

  let xAxis = (g) =>
    g
      .attr('transform', 'translate(0,' + margin.top + ')') // move x axis to bottom of chart
      .call(xTicks)
      .call((g) =>
        g.selectAll('.tick').attr('id', (d) => {
          if (d == 0) {
            return 'avg';
          } else if (d > 0) {
            return 'worse';
          } else {
            return 'better';
          }
        })
      )
      // .call(g => g.select(".tick:first-of-type text").remove()) // removes first label on x axis
      // .call(g => g.select(".tick:first-of-type line").remove()) // removes first tick on x axis
      .call((g) => g.attr('class', 'xAxis'));

  let yAxis = (g) =>
    g
      .attr('transform', 'translate(' + xScale(0) + ',-30)')
      .call(yTicks)
      .call((g) => g.select('.tick:first-of-type line').remove()) // removes first y axis tick
      .call((g) => g.attr('class', 'yAxis'));

  chartSVG.append('g').call(xAxis);

  chartSVG
    .append('text')
    .attr('transform', 'translate(' + (xScale.range()[1] + 38) + ',' + (margin.top + 5) + ')')
    .text('INTERVENTIONS (click to see details)')
    .attr('id', 'intervention-tick');

  chartSVG.append('g').call(yAxis);

  let arrowPoints = [
    [0, 0],
    [0, 6],
    [6, 3],
  ];
  chartSVG
    .append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', [0, 0, 6, 6])
    .attr('refX', 3)
    .attr('refY', 3)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', d3.line()(arrowPoints))
    .attr('stroke', 'black');

  let deltasArray = Object.keys(data.predictions[0]['mean_deltas']).reverse();

  deltasArray.forEach((variable) => {
    const line = d3
      .line()
      .defined((d) => d['mean_deltas'][variable] !== null)
      .x((d) => xScale(d['mean_deltas'][variable]))
      .y((d) => yScale(d.timestamp));
    // const area = d3.area()
    //     .defined(d => d[variable] !== null)
    //     .x1(d => xScale(d[variable]))
    //     .y(d => yScale(d.timestamp))
    //     .x0(xScale(0))
    chartSVG
      .append('path')
      .datum(currentPredictions)
      .attr('class', 'predLine prediction ' + variable.replace('_mean_delta', ''))
      .attr('d', line);
  });

  // let gratitudeLines = chartSVG.selectAll("g")
  //     .data(data['gratitudeLog'].filter(d => d.timestamp > currentPredictions[0]['timestamp'] && d.timestamp < currentPredictions[currentPredictions.length - 2]['timestamp']))
  //     .enter()
  //     .append("g")
  //     .selectAll("line")
  //         .data(d => d.gratutde_entries)
  //         .enter()
  //         .append("line")
  //             .attr("x1", xScale(0))
  //             .attr("x2", xScale.range()[1] + 650)
  //             .attr("y1", d => yScale(d.timestamp ))
  //             .attr("y2", d => yScale(d.timestamp ))
  //             .attr("class", "documentation docLine")

  update(currentPredictions);

  let lineChoice = document.getElementById('filterBy');

  lineChoice.oninput = (event) => {
    let selected = d3.selectAll('.' + event.target.value);
    let toggle = event.target.checked;
    selected.classed('hide', !toggle);
    if (!toggle) {
      selected.lower();
    }
  };

  let nextDayButton = document.getElementById('nextDay');
  nextDayButton.style.opacity = 0.2;
  let prevDayButton = document.getElementById('prevDay');
  let prevDayCaption = document.getElementById('prevDayCaption');
  let nextDayCaption = document.getElementById('nextDayCaption');

  prevDayButton.onmouseover = (event) => {
    prevDayCaption.style.display = 'block';
  };
  prevDayButton.onmouseout = (event) => {
    prevDayCaption.style.display = 'none';
  };

  prevDayButton.onclick = (event) => {
    if (nullIndex >= nullItems.length - 1) {
      prevDayButton.style.opacity = 0.2;
    } else {
      nextDayButton.style.opacity = 1;
      currentPredictions = data.predictions.slice(nullItems[nullIndex], nullItems[nullIndex + 1] + 1);
      //   console.log(nullIndex, nullIndex + 1);
      // console.log(nullItems[nullIndex], (nullItems[nullIndex + 1] + 1))
      nullIndex += 1;

      if (currentPredictions.length < 4) {
        currentPredictions = data.predictions.slice(nullItems[nullIndex + 1], nullItems[nullIndex + 2] + 1);
        // console.log(nullIndex + 1, nullIndex + 2);
        // console.log(nullItems[nullIndex + 1], (nullItems[nullIndex + 2] + 1))

        nullIndex += 2;
      }
      update(currentPredictions);
    }
  };

  nextDayButton.onmouseover = (event) => {
    nextDayCaption.style.display = 'block';
  };
  nextDayButton.onmouseout = (event) => {
    nextDayCaption.style.display = 'none';
  };

  nextDayButton.onclick = (event) => {
    nullIndex -= 1;

    if (nullIndex == 0) {
      currentPredictions = data.predictions.slice(0, nullItems[0] + 1);
      nextDayButton.style.opacity = 0.2;
    } else {
      prevDayButton.style.opacity = 1;

      currentPredictions = data.predictions.slice(nullItems[nullIndex - 1], nullItems[nullIndex] + 1);
      //   console.log(nullIndex - 1, nullIndex);
      // console.log(nullItems[nullIndex], (nullItems[nullIndex + 1] + 1))

      if (currentPredictions.length < 4) {
        nullIndex -= 1;

        currentPredictions = data.predictions.slice(nullItems[nullIndex - 1], nullItems[nullIndex] + 1);
        // console.log(nullIndex - 1, nullIndex);
        // console.log(nullItems[nullIndex - 1], (nullItems[nullIndex] + 1))
      }
    }
    update(currentPredictions);
  };

  function update(currentPredictions) {
    let t = d3.transition().duration(500).ease(d3.easeLinear);

    let lineChoice = document.getElementById('filterBy');
    let choices = lineChoice.querySelectorAll('input');
    let checkedEls = {};
    choices.forEach((choice) => {
      // let selected = d3.selectAll('.' + choice.value);
      let toggle = choice.checked;
      checkedEls[choice.value] = toggle;
    });

    yScale.domain([currentPredictions[1]['timestamp'], currentPredictions[currentPredictions.length - 2]['timestamp']]);
    d3.select('.yAxis').transition(t).call(yAxis);

    deltasArray.forEach((variable) => {
      const line = d3
        .line()
        .defined((d) => d['mean_deltas'][variable] !== null)
        .x((d) => xScale(d['mean_deltas'][variable]))
        .y((d) => yScale(d.timestamp));
      d3.select('.predLine.' + variable.replace('_mean_delta', ''))
        .datum(currentPredictions)
        .transition(t)
        .attr('d', line);

      // let interventionPTS = d3.selectAll(".interventionPTS." + variable.replace("_mean_delta", ""))
      //     .data(interventionData.filter(d => d.marker == variable.replace("_mean_delta", "")))
      // interventionPTS.exit().remove()
      // interventionPTS.enter().append("circle")
      //     .attr("r", 4.5)
      //     .merge(interventionPTS)
      //     .transition(t)
      //     .attr("class", d => "interventions interventionPTS " + d.marker)
      //     .attr("cx", d => xScale(d['mean_delta']))
      //     .attr("cy", d => yScale(d.timestamp))
      // let predLine = chartSVG.selectAll(".predLine." + variable.replace("_mean_delta", ""))
      //     .datum(currentPredictions)
      // predLine.exit().remove()
      // predLine.enter().append("path")
      //     .transition(t)
      //     .attr("d", line)
    });

    let ritualData = data['rituals'].filter(
      (d) =>
        d.timestamp < currentPredictions[1]['timestamp'] &&
        d.timestamp > currentPredictions[currentPredictions.length - 2]['timestamp']
    );

    let ritualLines = chartSVG
      .selectAll('.ritualLine')
      // .data(ritualData.filter(d => d.ritual !== "random joke" && d.ritual !== "random mindfulness"))
      .data(ritualData);
    ritualLines.exit().remove();
    ritualLines
      .enter()
      .append('line')
      .merge(ritualLines)
      .transition(t)
      .attr('x1', xScale(0))
      .attr('x2', xScale.range()[1] + 25)
      .attr('y1', (d) => yScale(d.timestamp))
      .attr('y2', (d) => yScale(d.timestamp))
      .attr('class', (d) => {
        if (!checkedEls['rituals']) {
          return 'rituals ritualLine hide';
        } else {
          return 'rituals ritualLine';
        }
      });

    let ritualPTS = chartSVG.selectAll('.ritualPTS').data(ritualData);
    // .data(ritualData.filter(d => d.ritual !== "random joke" && d.ritual !== "random mindfulness"))
    ritualPTS.exit().remove();
    ritualPTS
      .enter()
      .append('circle')
      .attr('r', 3)
      .merge(ritualPTS)
      .attr('class', (d) => {
        if (!checkedEls['rituals']) {
          return 'rituals ritualPTS hide';
        } else {
          return 'rituals ritualPTS';
        }
      })
      .attr('cx', xScale(0))
      .attr('cy', (d) => yScale(d.timestamp));

    let ritualText = chartSVG
      .selectAll('.ritualTXT')
      // .data(ritualData.filter(d => d.ritual !== "random joke" && d.ritual !== "random mindfulness"))
      .data(ritualData);
    ritualText.exit().remove();
    ritualText
      .enter()
      .append('text')
      .on('click', (d) => {
        // console.log(d.marker);
        // console.log(d.timestamp);
        // console.log(d.content);
        // console.log(d.title);
        let idName = 'rituals' + d.timestamp.toString().split('.')[0];
        if (document.getElementById(idName)) {
          let deet = d3.select('#' + idName);
          let deetLine = d3.select('#' + idName + '_line');
          var totalLength = deetLine.node().getTotalLength();

          if (deet.style('display') == 'none') {
            deetLine.style('stroke-width', 1.5);
            deetLine
              .attr('stroke-dasharray', totalLength + ' ' + totalLength)
              .attr('stroke-dashoffset', totalLength)
              .transition(t)
              .attr('stroke-dashoffset', 0)
              .on('end', function (d) {
                deetLine.attr('stroke-dasharray', 2);
                deet.style('display', 'block');
              });
          } else {
            deet.style('display', 'none');
            deetLine.style('stroke-width', 0);
          }
        } else {
          let newDeet = d3
            .select('#chart')
            .append('div')
            .html(d.content)
            .attr('class', 'deets rituals')
            .attr('id', idName)
            .style('left', xScale.range()[1] + 600)
            .style('top', yScale(d.timestamp))
            .style('display', 'none');

          let deetLine = chartSVG
            .append('line')
            .attr('x1', document.getElementById('text' + d.timestamp).getBoundingClientRect().right + 5)
            .attr('x2', xScale.range()[1] + 600)
            .attr('y1', yScale(d.timestamp))
            .attr('y2', yScale(d.timestamp))
            .attr('class', 'documentation deetLine rituals')
            .attr('id', idName + '_line');
          var totalLength = deetLine.node().getTotalLength();

          deetLine
            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition(t)
            .attr('stroke-dashoffset', 0)
            .on('end', function () {
              newDeet.style('display', 'block');
              newDeet.style(
                'top',
                yScale(d.timestamp) - document.getElementById(idName).getBoundingClientRect().height / 2
              );
              deetLine.attr('stroke-dasharray', 2);
            });
        }
      })
      .merge(ritualText)
      .transition(t)
      .attr('class', (d) => {
        if (!checkedEls['rituals']) {
          return 'rituals ritualTXT hide';
        } else {
          return 'rituals ritualTXT';
        }
      })
      .attr('id', (d) => 'text' + d.timestamp)
      .attr('x', xScale.range()[1] + 21.5)
      .attr('y', (d) => yScale(d.timestamp) + 4)
      .text((d) => {
        if (d.ritual.toLowerCase() == 'random mindfulness') {
          return '| Hey Jenna, ' + d.content.toLowerCase();
        } else if (d.ritual.toLowerCase() == 'random question') {
          return '| Hey Jenna, ask someone this question.';
        } else if (d.ritual.toLowerCase() == 'random joke') {
          return '| Hey Jenna, tell someone this joke.';
        } else if (d.ritual.toLowerCase() == 'sweet light walk') {
          return '| Hey Jenna, go out and meet your step goal.';
        } else {
          return '| Hey Jenna, time for a ' + d.ritual.toLowerCase();
        }
      });
    let interventionData = data['interventions'].filter(
      (d) =>
        d.timestamp < currentPredictions[1]['timestamp'] &&
        d.timestamp > currentPredictions[currentPredictions.length - 2]['timestamp']
    );
    // console.log(interventionData);

    d3.selectAll('.deets').remove();

    let interventionLines = chartSVG.selectAll('.interventionLine').data(interventionData);
    interventionLines.exit().remove();
    interventionLines
      .enter()
      .append('line')
      .merge(interventionLines)
      .transition(t)
      .attr('x1', (d) => xScale(d['mean_delta']))
      // .attr("x2", d => xScale(d['mean_delta']) + 140)
      .attr('x2', xScale.range()[1] + 25)
      .attr('y1', (d) => yScale(d.timestamp))
      .attr('y2', (d) => yScale(d.timestamp))
      // .attr('class', (d) => d.marker + ' interventions interventionLine')
      .attr('class', (d) => {
        if (!checkedEls['interventions']) {
          return 'interventions interventionLine hide ' + d.marker;
        } else if (!checkedEls[d.marker]) {
          return 'interventions interventionLine hide ' + d.marker;
        } else {
          return 'interventions interventionLine ' + d.marker;
        }
      });

    let interventionPTS = chartSVG.selectAll('.interventionPTS').data(interventionData);
    interventionPTS.exit().remove();
    interventionPTS
      .enter()
      .append('circle')
      .attr('r', 4.5)
      .merge(interventionPTS)
      .transition(t)
      // .attr('class', (d) => 'interventions interventionPTS ' + d.marker)
      .attr('class', (d) => {
        if (!checkedEls['interventions']) {
          return 'interventions interventionPTS hide ' + d.marker;
        } else if (!checkedEls[d.marker]) {
          return 'interventions interventionPTS hide ' + d.marker;
        } else {
          return 'interventions interventionPTS ' + d.marker;
        }
      })
      .attr('cx', (d) => xScale(d['mean_delta']))
      .attr('cy', (d) => yScale(d.timestamp));

    let interventionTXT = chartSVG.selectAll('.interventionTXT').data(interventionData);
    interventionTXT.exit().remove();
    interventionTXT
      .enter()
      .append('text')
      .on('mouseover', (d) => {
        // console.log(d.marker);
        // console.log(d.timestamp);
        // console.log(d.content);
        // console.log(d.intervention);

        let idName = 'intervention' + d.timestamp.toString().split('.')[0];

        if (document.getElementById(idName)) {
          let deet = d3.select('#' + idName);
          let deetLine = d3.select('#' + idName + '_line');
          var totalLength = deetLine.node().getTotalLength();

          if (deet.style('display') == 'none') {
            deetLine.style('stroke-width', 1.5);
            deetLine
              .attr('stroke-dasharray', totalLength + ' ' + totalLength)
              .attr('stroke-dashoffset', totalLength)
              .transition(t)
              .attr('stroke-dashoffset', 0)
              .on('end', function (d) {
                deetLine.attr('stroke-dasharray', 2);
                deet.style('display', 'block');
              });
          } else {
            deet.style('display', 'none');
            deetLine.style('stroke-width', 0);
          }
        } else {
          let newDeet = d3
            .select('#chart')
            .append('div')
            .html(d.content)
            .attr('class', 'deets interventions ' + d.marker)
            .attr('id', idName)
            .style('left', xScale.range()[1] + 600)
            .style('top', yScale(d.timestamp))
            .style('display', 'none');

          let deetLine = chartSVG
            .append('line')
            .attr('x1', document.getElementById('text' + d.timestamp).getBoundingClientRect().right + 5)
            .attr('x2', xScale.range()[1] + 600)
            .attr('y1', yScale(d.timestamp))
            .attr('y2', yScale(d.timestamp))
            .attr('class', 'documentation deetLine interventions ' + d.marker)
            .attr('id', idName + '_line');
          var totalLength = deetLine.node().getTotalLength();

          deetLine
            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition(t)
            .attr('stroke-dashoffset', 0)
            .on('end', function () {
              newDeet.style('display', 'block');
              newDeet.style(
                'top',
                yScale(d.timestamp) - document.getElementById(idName).getBoundingClientRect().height / 2
              );
              deetLine.attr('stroke-dasharray', 2);
            });

          if (d.intervention == 'videos') {
            let link;
            if (d.content.includes('&')) {
              link = d.content.slice(0, d.content.indexOf('&'));
            } else {
              link = d.content;
            }
            // newDeet.html("<p><b>Marker: </b>" + d.marker + "</p><p><b>Intervention: </b>" + d.intervention + "</p><p><b>Timestamp: </b>" + d.timestamp + "</p><p><b>Content: </b>" + "<iframe width='350' height='200' src='" + link.replace("watch?v=", "embed/") + "'></iframe>")
            newDeet.html("<iframe width='350' height='200' src='" + link.replace('watch?v=', 'embed/') + "'></iframe>");
          } else if (d.intervention == 'cuteThings') {
            // newDeet.html("<p><b>Marker: </b>" + d.marker + "</p><p><b>Intervention: </b>" + d.intervention + "</p><p><b>Timestamp: </b>" + d.timestamp + "</p><p><b>Content: </b>" + "<img width='350' src='" + d.content+ "'>")
            newDeet.html("<img width='350' src='" + d.content + "'>");
          } else if (d.intervention == 'fieldTrip') {
            // newDeet.html("<p><b>Marker: </b>" + d.marker + "</p><p><b>Intervention: </b>" + d.intervention + "</p><p><b>Timestamp: </b>" + d.timestamp + "<p><b>Content: </b><br><iframe width='350' height='300' frameborder='0' style='border:0' src='" + "https://www.google.com/maps/embed/v1/place?key=AIzaSyCidl2VEMJ6et1L-eOTFwtIfPPp4zvMfDw&q=" + d.content.slice(48,d.content.length) + "' allowfullscreen></iframe>")
            newDeet.html(
              "<iframe width='350' height='300' frameborder='0' style='border:0' src='" +
                'https://www.google.com/maps/embed/v1/place?key=AIzaSyCidl2VEMJ6et1L-eOTFwtIfPPp4zvMfDw&q=' +
                d.content.slice(48, d.content.length) +
                "' allowfullscreen></iframe>"
            );
          } else if (d.intervention == 'interactions') {
            if (d.content.includes('http')) {
              newDeet.html("<img width='350' src='" + d.content + "'>");
            } else {
              newDeet.html(d.content);
            }
          } else if (d.marker == 'fatigue' || (d.marker == 'stress' && d.intervention == 'exercises')) {
            data['lookup']['danceTracks'].forEach((track) => {
              try {
                if (track.title == d.content) {
                  // newDeet.html("<p><b>Marker: </b>" + d.marker + "</p><p><b>Intervention: </b>" + d.intervention + "</p><p><b>Timestamp: </b>" + d.timestamp + "<p><b>Content: </b>" + "<iframe src='" + track.link.slice(0,25) + "embed/" + track.link.slice(25,track.link.length) + "' width='350' height='85' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>" + "</p>")
                  newDeet.html(
                    "<iframe src='" +
                      track.link.slice(0, 25) +
                      'embed/' +
                      track.link.slice(25, track.link.length) +
                      "' width='350' height='85' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
                  );
                }
              } catch {
                // newDeet.html("<p><b>Marker: </b>" + d.marker + "</p><p><b>Intervention: </b>" + d.intervention + "</p><p><b>Timestamp: </b>" + d.timestamp + "<p><b>Content: </b>" + d.content + "</p>")
                newDeet.html(d.content);
              }
            });
          }
          newDeet.raise();
        }
      })
      .merge(interventionTXT)
      .transition(t)
      // .attr('class', (d) => 'interventions interventionTXT ' + d.marker)
      .attr('class', (d) => {
        if (!checkedEls['interventions']) {
          return 'interventions interventionTXT hide ' + d.marker;
        } else if (!checkedEls[d.marker]) {
          return 'interventions interventionTXT hide ' + d.marker;
        } else {
          return 'interventions interventionTXT ' + d.marker;
        }
      })
      .attr('id', (d) => 'text' + d.timestamp)
      // .attr("x", d => xScale(d['mean_delta']) + 145)
      .attr('x', xScale.range()[1] + 21.5)
      .attr('y', (d) => yScale(d.timestamp) + 4)
      .text((d) => {
        let script = data['lookup']['scripts'][d.marker][d.intervention];
        if (typeof script !== 'string') {
          if (d.content.includes('Workout') || d.content.includes('Yoga')) {
            script = data['lookup']['scripts'][d.marker][d.intervention]['workouts'];
          } else if (d.content.includes('sleep')) {
            script = 'Hey Jenna, you should go to sleep.';
          } else if (d.content.includes('http')) {
            script = 'Hey Jenna, share this image.';
          } else if (d.content.includes('-')) {
            script =
              data['lookup']['scripts'][d.marker][d.intervention]['danceTracks'] +
              d.content.slice(d.content.indexOf('-') + 1, d.content.length) +
              '!';
          } else if (d.content.includes('question')) {
            script = data['lookup']['scripts'][d.marker][d.intervention]['question'];
          } else if (d.content.includes('joke')) {
            script = data['lookup']['scripts'][d.marker][d.intervention]['joke'];
          } else if (d.content.includes('compliment')) {
            script = data['lookup']['scripts'][d.marker][d.intervention]['compliment'];
          } else {
            script = 'Hey Jenna, ' + d.content.toLowerCase();
          }
        } else if (d.intervention == 'poetry') {
          let info = d.content.split(' ');
          let author = info.slice(info.indexOf('by') + 1, info.length);
          script =
            script +
            'by ' +
            author.reduce(function (acc, val) {
              return acc + ' ' + val;
            }) +
            '.';
        }
        return '| ' + script;
      });

    interventionTXT.raise();

    d3.selectAll('.documentation').remove();
    let docData = data['documentation'].filter(
      (d) =>
        d.timestamp < currentPredictions[1]['timestamp'] + 60 * 60 * 3 * 1000 &&
        d.timestamp > currentPredictions[currentPredictions.length - 2]['timestamp']
    );

    let documentation = d3
      .select('#chart')
      .selectAll('div')
      .data(docData)
      .enter()
      .append('div')
      // .attr("class", d => d.extension.slice(1,d.extension.length) + " documentation")
      .attr('class', (d) => 'intervention' + d.timestamp.toString().split('.')[0] + ' documentation deets')
      .attr('id', (d) => 'doc' + d.timestamp)
      .html((d) => {
        d.fileName;
        if (d.extension == '.jpg') {
          return (
            "<img src='documentation/files/" + d.fileName + "' width='55%'><p>(belated intervention adherence)</p>"
          );
        } else if (d.extension == '.gif') {
          return (
            "<img src='documentation/files/" + d.fileName + "' width='85%'><p>(belated intervention adherence)</p>"
          );
        } else if (d.extension == '.mp3') {
          return (
            "<audio controls><source src='documentation/files/" +
            d.fileName +
            "' type='audio/mpeg'> Your browser does not support the audio element.</audio><p>(belated intervention adherence)</p>"
          );
        } else if (d.extension == '.mp4') {
          return (
            "<video width='55%' controls><source src='documentation/files/" +
            d.fileName +
            "' type='video/mp4'>Your browser does not support the video tag.</video><p>(belated intervention adherence)</p>"
          );
        }
        // else if (d.extension == undefined) {
        //   return '<p>' + d.entry + '</p>';
        // }
      })
      .style('left', xScale.range()[1] + 600)

      .style('top', (d) => yScale(d.timestamp))
      .on('mouseover', (d) => {
        let idName = 'doc' + d.timestamp.toString();
        let documentation = document.getElementById(idName);
        documentation.parentNode.appendChild(documentation);
      });
    // let docTXT = chartSVG.selectAll('.docTXT').data(docData);
    // docTXT.exit().remove();
    // docTXT
    //   .enter()
    //   .append('text')
    //   .merge(docTXT)
    //   .transition(t)
    //   // .attr('class', (d) => 'interventions interventionTXT ' + d.marker)
    //   .attr('class', 'docTXT')
    //   .attr('id', (d) => 'text' + d.timestamp)
    //   // .attr("x", d => xScale(d['mean_delta']) + 145)
    //   .attr('x', xScale.range()[1] + 35)
    //   .attr('y', (d) => yScale(d.timestamp) + 4)
    //   .text('(belated intervention adherence)')
    //   .on('end', function () {
    //     chartSVG
    //       .append('g')
    //       .selectAll('line')
    //       .data(docData)
    //       .enter()
    //       .append('line')
    //       // .attr('x1', xScale(0))
    //       .attr('x1', (d) => document.querySelector('.docTXT').getBoundingClientRect().right + 15)
    //       .attr('x2', xScale.range()[1] + 600)
    //       .attr('y1', (d) => yScale(d.timestamp))
    //       .attr('y2', (d) => yScale(d.timestamp))
    //       .attr('class', 'documentation docLine');
    //   });
    let docLines = chartSVG
      .append('g')
      .selectAll('line')
      .data(docData)
      .enter()
      .append('line')
      // .attr('x1', xScale(0))
      // .attr('x2', xScale.range()[1] + 600)
      // .attr('y1', (d) => yScale(d.timestamp))
      // .attr('y2', (d) => yScale(d.timestamp))
      .attr('x1', (d) => xScale(0))
      // .attr("x2", d => xScale(d['mean_delta']) + 140)
      .attr('x2', xScale.range()[1] + 600)
      .attr('y1', (d) => yScale(d.timestamp))
      .attr('y2', (d) => yScale(d.timestamp))
      .attr('class', 'documentation docLine');

    // let docPTS = chartSVG.append("g")
    //     .selectAll("circle")
    //     .data(docData)
    //     .enter()
    //     .append("circle")
    //         .attr("class", "documentation docPTS")
    //         .attr("cx", xScale(0))
    //         .attr("cy", d => yScale(d.timestamp ))
    //         .attr("r", 3.5)
  }
});

let cover = document.getElementById('cover');
let gentileschi = document.getElementById('gentileschi');
let intro = document.getElementById('intro');
let chart = document.getElementById('chart');
let chartNav = document.getElementById('chartNav');
let captionContainer = document.getElementById('caption-container');
let caption = document.getElementById('caption');
caption.style.display = 'none';
caption.innerHTML =
  "Style-transferred from <i><a href='https://en.wikipedia.org/wiki/Self-Portrait_as_the_Allegory_of_Painting' target='new'>Self-Portrait as the Allegory of Painting</a></i> using <a href='https://github.com/lengstrom/fast-style-transfer' target='new'>Fast Style Transfer</a>";

captionContainer.onclick = function () {
  if (caption.style.display == 'none') {
    caption.style.display = 'block';
  } else {
    caption.style.display = 'none';
  }
};
// let border = document.getElementById('border-fullScreen')

window.onscroll = function () {
  if (window.scrollY < cover.getBoundingClientRect().height) {
    cover.style.visibility = 'visible';
    cover.style.opacity =
      (cover.getBoundingClientRect().height - window.scrollY) / cover.getBoundingClientRect().height;
    gentileschi.style.visibility = 'visible';
    gentileschi.style.opacity =
      1 - (intro.getBoundingClientRect().height - window.scrollY) / intro.getBoundingClientRect().height;
    gentileschi.style.transition = 'none';
    gentileschi.style.webkitTransition = 'none';
    caption.innerHTML =
      "Style-transferred from <i><a href='https://en.wikipedia.org/wiki/Self-Portrait_as_the_Allegory_of_Painting' target='new'>Self-Portrait as the Allegory of Painting</a></i> using <a href='https://github.com/lengstrom/fast-style-transfer' target='new'>Fast Style Transfer</a>";
  } else if (window.scrollY > cover.getBoundingClientRect().height && intro.getBoundingClientRect().bottom > 0) {
    cover.style.visibility = 'hidden';
    cover.style.opacity = 0;
    gentileschi.style.transition = 'opacity 600ms, visibility 600ms';
    gentileschi.style.webkitTransition = 'opacity 600ms, visibility 600ms';
    gentileschi.style.visibility = 'visible';
    gentileschi.style.opacity = 1;
    captionContainer.style.display = 'block';
    caption.innerHTML =
      "<i><a href='https://en.wikipedia.org/wiki/Self-Portrait_as_the_Allegory_of_Painting' target='new'>Self-Portrait as the Allegory of Painting</a></i> by Artemisia Gentileschi, 1638–39";
  }

  if (window.scrollY >= intro.getBoundingClientRect().height) {
    if (intro.getBoundingClientRect().bottom >= 0) {
      gentileschi.style.transition = 'none';
      gentileschi.style.webkitTransition = 'none';
      gentileschi.style.opacity = intro.getBoundingClientRect().bottom / intro.getBoundingClientRect().height;
    } else {
      captionContainer.style.display = 'none';
      gentileschi.style.transition = 'opacity 600ms, visibility 600ms';
      gentileschi.style.webkitTransition = 'opacity 600ms, visibility 600ms';
      gentileschi.style.visibility = 'hidden';
      gentileschi.style.opacity = 0;
      cover.style.visibility = 'hidden';
      cover.style.opacity = 0;
      // border.style.position = "fixed"
    }
  }
  // else if(window.scrollY < intro.getBoundingClientRect().top){
  //     intro.style.visibility = "visible"
  //     intro.style.opacity = (intro.getBoundingClientRect().top - window.scrollY) / intro.getBoundingClientRect().top
  // }
  // else if(window.scrollY >= intro.getBoundingClientRect().top){
  //     intro.style.visibility = "hidden"
  //     intro.style.opacity = 0
  // }
  if (chart.getBoundingClientRect().top < 300) {
    // chartNav.style.display = "block"
    chartNav.style.visibility = 'visible';
    chartNav.style.opacity = 1;
  } else if (chart.getBoundingClientRect().top > 300) {
    // chartNav.style.display = "none"
    chartNav.style.visibility = 'hidden';
    chartNav.style.opacity = 0;
  }
  let fitterHappierVid = document.getElementById('fitter-happier-vid');

  if (isScrolledIntoView(fitterHappierVid)) {
    fitterHappierVid.play();
  } else {
    fitterHappierVid.pause();
  }
};

function isScrolledIntoView(element) {
  var elementTop = element.getBoundingClientRect().top,
    elementBottom = element.getBoundingClientRect().bottom;

  return elementTop >= 0 && elementBottom <= window.innerHeight;
}
