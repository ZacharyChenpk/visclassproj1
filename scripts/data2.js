//let width = 800;
//sum_item,sum_money,moe_item,moe_moeny,cas_item,cas_money,dep_item,dep_money,prov_item,prov_money,sum_item_rate,sum_money_rate,moe_item_rate,moe_moeny_rate,cas_item_rate,cas_money_rate,dep_item_rate,dep_money_rate,prov_item_rate,prov_money_rate
let keys = [
	'合计项数',
	'合计金额',
	'教育部项数',
	'教育部金额',
	'中科院项数',
	'中科院金额',
	'各部门项数',
	'各部门金额',
	'各省项数',
	'各省金额',
	'教育部项数比例',
	'教育部金额比例',
	'中科院项数比例',
	'中科院金额比例',
	'各部门项数比例',
	'各部门金额比例',
	'各省项数比例',
	'各省金额比例',
];
//let height = keys.length * 90 || 700;
/*
d3.json("data2.json", function(data){
let height = keys.length * 90 || 700;
let margin = { top: 20, right: 10, bottom: 20, left: 100 };

//比例尺
let x = new Map(
	Array.from(keys, key => [
		key,
		d3.scaleLinear(d3.extent(data, d => d[key]), [margin.left, width - margin.right]),
	])
);

let y = d3.scalePoint(keys, [margin.top, height - margin.bottom]);

let z = d3.scaleSequential(
	x
		.get(keys)
		.domain()
		.reverse(),
	d3.interpolateBrBG
);

// 画布
let svg = d3.select('body')
	.append('svg')
	.attr('width', width)
	.attr('height', height);
svg.append('g')
	.attr('fill', 'none')
	.attr('stroke-width', 1.5)
	.selectAll('path')
	.data(data)
	.enter()
	.append('path')
	.attr('stroke', function(d){ return z(d[keys]);})
	.attr('stroke-opacity', 0.4)
	.attr('d',function(d){
		return d3.line()
			.x(([key, value]) => x.get(key)(value))
			.y(([key]) => y(key))(d3.cross(keys, [d], (key, a) => [key, a[key]]))
	})
	.append('title')
	.text(function(d){return d.department;});

svg.append('g')
	.selectAll('g')
	.data(keys)
	.enter()
	.append('g')
	.attr('transform', d => `translate(0,${y(d)})`)
	.each(function(d) {
		d3.select(this).call(d3.axisBottom(x.get(d)));
	})
	.call(g =>
		g
			.append('text')
			.attr('x', margin.left)
			.attr('y', -6)
			.attr('text-anchor', 'start')
			.attr('fill', 'currentColor')
			.text(d => d)
	)
	.call(g =>
		g
			.selectAll('text')
			.clone(true)
			.lower()
			.attr('fill', 'none')
			.attr('stroke-width', 5)
			.attr('stroke-linejoin', 'round')
			.attr('stroke', 'white')
	);
})*/
/*
d3.csv('data2.csv', function(data) {
	let svg = d3.select('body')
		.append('svg')
		.attr('width', width)
		.attr('height', height);
	//var colorgen = d3.scaleOrdinal(["#a6cee3","#1f78b4","#b2df8a","#33a02c",
	//					"#fb9a99","#e31a1c","#fdbf6f","#ff7f00",
	//					"#cab2d6","#6a3d9a","#ffff99","#b15928"]);

	//var color = function(d) { return colors(d.group); };

	var parcoords = d3.parcoords()("#example-progressive")
		.data(data)
		.hideAxis(["department"])
		//.color(color)
		.alpha(0.25)
		.composite("darken")
		.margin({ top: 24, left: 150, bottom: 12, right: 0 })
		.mode("queue")
		.render()
		.brushMode("1D-axes");  // enable brushing

	parcoords.svg.selectAll("text")
		.style("font", "10px sans-serif");
});*/

/*
var parcoords = d3.parcoords()("#nutrients");
var transparency = d3.scalePow()
    .exponent(0.15)
    .range([1,0.12]);

var colorList = ["#483D8B","#0000FF","#0000CD","#191970","#00008B","#000080","#4169E1","#4682B4"];
d3.csv('data2.csv', function(data) {
	console.log('A')
    //data = data.slice(0, 1000);
    var colorMap = {};
    _(data).chain()
        .pluck('department')
        .uniq()
        .each(function(d,i) {
            colorMap[d] = colorList.length > i ? colorList[i] : "black";
        });

    var color = function(d) { return colorMap[d.department]; };
    console.log(d3.svg)
    transparency.domain([1,data.length]);
    
    parcoords
        .data(data)
        .alpha(transparency(data.length))
        .color(color)
        .margin({ top: 64, left: 120, bottom: 12, right: 70 })
        .mode("queue")
        .render()
        .brushMode("1D-axes");  // enable brushing
console.log('C')

console.log('E')
    window.onresize = function() {
        setTimeout(function(){
            parcoords.width(document.body.clientWidth);
            parcoords.resize();
        }, 1000);
    };
console.log('F')
});*/

var margin = {top: 40, right: 40, bottom: 20, left: 88},
    width = 700 - margin.left - margin.right,
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

var dimensions = [
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
    key: "moe_item",
    description: "教育部项数",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "moe_moeny",
    type: types["Number"],
    description: "教育部金额",
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "cas_item",
    description: "中科院项数",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "cas_money",
    description: "中科院金额",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "dep_item",
    description: "各部门项数",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "dep_money",
    description: "各部门金额",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "prov_item",
    description: "各省项数",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "prov_money",
    description: "各省金额",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "moe_item_rate",
    description: "教育部项数比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "moe_money_rate",
    description: "教育部金额比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "cas_item_rate",
    description: "中科院项数比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "cas_money_rate",
    description: "中科院金额比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "dep_item_rate",
    description: "各部门项数比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "dep_money_rate",
    description: "各部门金额比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "prov_item_rate",
    description: "各省项数比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  },
  {
    key: "prov_money_rate",
    description: "各省金额比例",
    type: types["Number"],
    scale: d3.scaleLinear().range([innerHeight, 0])
  }
];

var xscale = d3.scalePoint()
    .domain(d3.range(dimensions.length))
    .range([0, width]);

var yAxis = d3.axisLeft();

var container = d3.select("body").append("div")
	.style("float", "left")
	//.style("white-space","nowrap")
    .attr("class", "parcoords")
    .style("width", width + margin.left + margin.right + "px")
    .style("height", height + margin.top + margin.bottom + "px");

var svg3 = container.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var canvas = container.append("canvas")
    .attr("width", width * devicePixelRatio)
    .attr("height", height * devicePixelRatio)
    .style("width", width + "px")
    .style("height", height + "px")
    .style("margin-top", margin.top + "px")
    .style("margin-left", margin.left + "px");

var ctx = canvas.node().getContext("2d");
ctx.globalCompositeOperation = 'darken';
ctx.globalAlpha = 0.15;
ctx.lineWidth = 1.5;
ctx.scale(devicePixelRatio, devicePixelRatio);

//var output = d3.select("body").append("pre");

var axes = svg3.selectAll(".axis")
    .data(dimensions)
  .enter().append("g")
    .attr("class", function(d) { return "axis " + d.key.replace(/ /g, "_"); })
    .attr("transform", function(d,i) { return "translate(" + xscale(i) + ")"; });

d3.csv("data2.csv", function(error, data) {
  if (error) throw error;

  // shuffle the data!
  data = d3.shuffle(data);

  data.forEach(function(d) {
    dimensions.forEach(function(p) {
      d[p.key] = !d[p.key] ? null : p.type.coerce(d[p.key]);
    });

    // truncate long text strings to fit in data table
    for (var key in d) {
      if (d[key] && d[key].length > 35) d[key] = d[key].slice(0,36);
    }
  });

  // type/dimension default setting happens here
  dimensions.forEach(function(dim) {
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

  var render = renderQueue(draw).rate(50);

  ctx.clearRect(0,0,width,height);
  ctx.globalAlpha = d3.min([0.85/Math.pow(data.length,0.3),1]);
  render(data);

  axes.append("g")
      .each(function(d) {
        var renderAxis = "axis" in d
          ? d.axis.scale(d.scale)  // custom axis
          : yAxis.scale(d.scale);  // default axis
        d3.select(this).call(renderAxis);
      })
    .append("text")
      .attr("class", "title")
      .attr("text-anchor", "start")
      .text(function(d) { return "description" in d ? d.description : d.key; });

  // Add and store a brush for each axis.
  axes.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(d.brush = d3.brushY()
          .extent([[-10,0], [10,height]])
          .on("start", brushstart)
          .on("brush", brush)
          .on("end", brush)
        )
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

  d3.selectAll(".axis.department .tick text")
    .style("fill", color);
    
  //output.text(d3.tsvFormat(data.slice(0,24)));

  function project(d) {
    return dimensions.map(function(p,i) {
      // check if data element has property and contains a value
      if (
        !(p.key in d) ||
        d[p.key] === null
      ) return null;

      return [xscale(i),p.scale(d[p.key])];
    });
  };

  function draw(d) {
    ctx.strokeStyle = color(d.department);
    ctx.beginPath();
    let coords = project(d);
    coords.forEach(function(p,i) {
      // this tricky bit avoids rendering null values as 0
      if (p === null) {
        // this bit renders horizontal lines on the previous/next
        // dimensions, so that sandwiched null values are visible
        if (i > 0) {
          let prev = coords[i-1];
          if (prev !== null) {
            ctx.moveTo(prev[0],prev[1]);
            ctx.lineTo(prev[0]+6,prev[1]);
          }
        }
        if (i < coords.length-1) {
          let next = coords[i+1];
          if (next !== null) {
            ctx.moveTo(next[0]-6,next[1]);
          }
        }
        return;
      }
      
      if (i == 0) {
        ctx.moveTo(p[0],p[1]);
        return;
      }

      ctx.lineTo(p[0],p[1]);
    });
    ctx.stroke();
  }

  function brushstart() {
    d3.event.sourceEvent.stopPropagation();
  }

  // Handles a brush event, toggling the display of foreground lines.
  function brush() {
    render.invalidate();

    var actives = [];
    svg3.selectAll(".axis .brush")
      .filter(function(d) {
        return d3.brushSelection(this);
      })
      .each(function(d) {
        actives.push({
          dimension: d,
          extent: d3.brushSelection(this)
        });
      });

    var selected = data.filter(function(d) {
      if (actives.every(function(active) {
          var dim = active.dimension;
          // test if point is within extents for each active brush
          return dim.type.within(d[dim.key], active.extent, dim);
        })) {
        return true;
      }
    });

    ctx.clearRect(0,0,width,height);
    ctx.globalAlpha = d3.min([0.85/Math.pow(selected.length,0.3),1]);
    render(selected);

    //output.text(d3.tsvFormat(selected.slice(0,24)));
  }
});

function d3_functor(v) {
  return typeof v === "function" ? v : function() { return v; };
};