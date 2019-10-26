/*
var margin = {top: 40, right: 40, bottom: 20, left: 128},
    width = 800 - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom,
    innerHeight = height - 2;

var devicePixelRatio = window.devicePixelRatio || 1;

var color = d3.scaleOrdinal()
  .range(["#5DA5B3","#D58323","#DD6CA7","#54AF52","#8C92E8","#E15E5A","#725D82","#776327","#50AB84","#954D56","#AB9C27","#517C3F","#9D5130","#357468","#5E9ACF","#C47DCB","#7D9E33","#DB7F85","#BA89AD","#4C6C86","#B59248","#D8597D","#944F7E","#D67D4B","#8F86C2"]);

var types = {
  "Number": {
    key: "Number",
    coerce: function(d) { return +d; },
    extent: d3.extent,
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3.scaleLinear().range([innerHeight, 0])
  },
  "String": {
    key: "String",
    coerce: String,
    extent: function (data) { return data.sort(); },
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3.scalePoint().range([0, innerHeight])
  },
  "Date": {
    key: "Date",
    coerce: function(d) { return new Date(d); },
    extent: d3.extent,
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3.scaleTime().range([0, innerHeight])
  }
};
*/
var dimensions2 = [
  {
    key: "department",
    description: "科学部",
    type: types["String"],
    axis: d3.axisLeft()
      .tickFormat(function(d,i) {
        return d;
      })
  },
  {
    key: "sum_item",
    description: "合计项数",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "sum_money",
    description: "合计金额",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "school_item",
    description: "高等院校项数",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "school_money",
    description: "高等院校金额",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "sci_item",
    description: "科研单位项数",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "sci_money",
    description: "科研单位金额",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "other_item",
    description: "其他项数",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "other_money",
    description: "其他金额",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "school_item_rate",
    description: "高等院校项数比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "school_money_rate",
    description: "高等院校金额比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "sci_item_rate",
    description: "科研单位项数比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "sci_money_rate",
    description: "科研单位金额比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "other_item_rate",
    description: "其他项数比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "other_money_rate",
    description: "其他金额比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  }
];

var xscale2 = d3.scalePoint()
    .domain(d3.range(dimensions2.length))
    .range([0, width]);

var yAxis2 = d3.axisLeft();

var container2 = d3.select("body").append("div")
    .style("float", "left")
    .attr("class", "parcoords")
    //.style("white-space","nowrap")
    .style("width", width + margin.left + margin.right + "px")
    .style("height", height + margin.top + margin.bottom + "px");

var svg4 = container2.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var canvas2 = container2.append("canvas")
    .attr("width", width * devicePixelRatio)
    .attr("height", height * devicePixelRatio)
    .style("width", width + "px")
    .style("height", height + "px")
    .style("margin-top", margin.top + "px")
    .style("margin-left", margin.left + "px");

var ctx2 = canvas2.node().getContext("2d");
ctx2.globalCompositeOperation = 'darken';
ctx2.globalAlpha = 0.15;
ctx2.lineWidth = 1.5;
ctx2.scale(devicePixelRatio, devicePixelRatio);

//var output = d3.select("body").append("pre");

var axes2 = svg4.selectAll(".axis")
    .data(dimensions2)
  .enter().append("g")
    .attr("class", function(d) { return "axis " + d.key.replace(/ /g, "_"); })
    .attr("transform", function(d,i) { return "translate(" + xscale2(i) + ")"; });

d3.csv("data3.csv", function(error, data) {
  if (error) throw error;

  // shuffle the data!
  data = d3.shuffle(data);

  data.forEach(function(d) {
    dimensions2.forEach(function(p) {
      d[p.key] = !d[p.key] ? null : p.type.coerce(d[p.key]);
    });

    // truncate long text strings to fit in data table
    for (var key in d) {
      if (d[key] && d[key].length > 35) d[key] = d[key].slice(0,36);
    }
  });

  // type/dimension default setting happens here
  dimensions2.forEach(function(dim) {
    if (!("domain" in dim)) {
      // detect domain using dimension type's extent function
      dim.domain = d3_functor(dim.type.extent)(data.map(function(d) { return d[dim.key]; }));
    }
    if (!("scale" in dim)) {
      // use type's default scale for dimension
      dim.scale = dim.type.defaultScale.copy();
    }
    dim.scale.domain(dim.domain);
  });

  var render2 = renderQueue(draw2).rate(50);

  ctx2.clearRect(0,0,width,height);
  ctx2.globalAlpha = d3.min([0.85/Math.pow(data.length,0.3),1]);
  render2(data);

  axes2.append("g")
      .each(function(d) {
        var render2Axis2 = "axis" in d
          ? d.axis.scale(d.scale)  // custom axis
          : yAxis2.scale(d.scale);  // default axis
        d3.select(this).call(render2Axis2);
      })
    .append("text")
      .attr("class", "title")
      .attr("text-anchor", "start")
      .text(function(d) { return "description" in d ? d.description : d.key; });

  // Add and store a brush for each axis.
  axes2.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(d.brush = d3.brushY()
          .extent([[-10,0], [10,height]])
          .on("start", brushstart)
          .on("brush", brush2)
          .on("end", brush2)
        )
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

  d3.selectAll(".axis.department .tick text")
    .style("fill", color);
    
  //output.text(d3.tsvFormat(data.slice(0,24)));

  function project2(d) {
    return dimensions2.map(function(p,i) {
      // check if data element has property and contains a value
      if (
        !(p.key in d) ||
        d[p.key] === null
      ) return null;

      return [xscale2(i),p.scale(d[p.key])];
    });
  };

  function draw2(d) {
    ctx2.strokeStyle = color(d.department);
    ctx2.beginPath();
    let coords = project2(d);
    coords.forEach(function(p,i) {
      // this tricky bit avoids render2ing null values as 0
      if (p === null) {
        // this bit render2s horizontal lines on the previous/next
        // dimensions2, so that sandwiched null values are visible
        if (i > 0) {
          let prev = coords[i-1];
          if (prev !== null) {
            ctx2.moveTo(prev[0],prev[1]);
            ctx2.lineTo(prev[0]+6,prev[1]);
          }
        }
        if (i < coords.length-1) {
          let next = coords[i+1];
          if (next !== null) {
            ctx2.moveTo(next[0]-6,next[1]);
          }
        }
        return;
      }
      
      if (i == 0) {
        ctx2.moveTo(p[0],p[1]);
        return;
      }

      ctx2.lineTo(p[0],p[1]);
    });
    ctx2.stroke();
  }

  function brushstart() {
    d3.event.sourceEvent.stopPropagation();
  }

  // Handles a brush event, toggling the display of foreground lines.
  function brush2() {
    render2.invalidate();

    var actives2 = [];
    svg4.selectAll(".axis .brush")
      .filter(function(d) {
        return d3.brushSelection(this);
      })
      .each(function(d) {
        actives2.push({
          dimension: d,
          extent: d3.brushSelection(this)
        });
      });

    var selected2 = data.filter(function(d) {
      if (actives2.every(function(active) {
          var dim2 = active.dimension;
          // test if point is within extents for each active brush
          return dim2.type.within(d[dim2.key], active.extent, dim2);
        })) {
        return true;
      }
    });

    ctx2.clearRect(0,0,width,height);
    ctx2.globalAlpha = d3.min([0.85/Math.pow(selected2.length,0.3),1]);
    render2(selected2);

    //output.text(d3.tsvFormat(selected.slice(0,24)));
  }
});

function d3_functor(v) {
  return typeof v === "function" ? v : function() { return v; };
};