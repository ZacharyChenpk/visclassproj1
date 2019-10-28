let rowConverter2 = function(d) {
	return {
		subject: d.subject,
		ac_money: parseFloat(d.ac_money),
		ac_item: parseFloat(d.ac_item),
		app_item: parseFloat(d.app_item),
		app_money: parseFloat(d.app_money),
		gg_item: parseFloat(d.app_item) - parseFloat(d.ac_item),
		gg_money: parseFloat(d.app_money) - parseFloat(d.ac_money),
		father: parseInt(d.father),
		id: parseInt(d.id)
	};
}
let data2;
d3.csv("data1_detail.csv", rowConverter2, function(d){
	data2 = d;
	let len = data2.length
	let w2 = 5, //柱宽度
	    height = 400,   //画布高度
	    width = 600,  //画布宽度
	    left = 50,
	    bottom = 20;
	    padding = 30;
	//创建svg2画布
	let svg2 = d3.select('body')
	    .append('svg')
	    .attr('width',width)
	    .attr('height',height)
	    .style('margin-left','100px')
	    .style('padding','20px')
	    .style('border','1px solid green')
	//创建线性比例尺
	let x = d3.scaleLinear().domain([0,len]).range([padding, width-padding]);
	let y = d3.scaleLinear().domain([0,d3.max(data2,function(d) {return d.app_money;})]).range([height-padding,padding]);
	let y2 = d3.scaleLinear().domain([0,d3.max(data2,function(d) {return d.app_item;})]).range([height-padding,padding]);
	svg2.selectAll('rect#app_money_sub')
	    .data(data2)
	    .enter()
	    .append('rect')
	    .attr('id', 'app_money_sub')
	    .attr('x',function(d,i){
	        return x(i)+w2*(d.father+1)/4;
	    })
	    .attr('y',function(d,i){
	        return y(d.app_money);
	    })
	    .attr('width',w2)
	    .attr('height',function(d,i){
	        return height - y(d.app_money) - padding;
	    })
	    .attr('fill','gray')

	svg2.selectAll('rect#app_item')
	    .data(data2)
	    .enter()
	    .append('rect')
	    .attr('id', 'app_item')
	    .attr('x',function(d,i){
	        return x(i)+w2*(d.father+5)/4;
	    })
	    .attr('y',function(d,i){
	        return y2(d.app_item);
	    })
	    .attr('width',w2)
	    .attr('height',function(d,i){
	        return height - y2(d.app_item) - padding;
	    })
	    .attr('fill','rgb(128,138,135)')

	svg2.selectAll('rect#ac_money')
	    .data(data2)
	    .enter()
	    .append('rect')
	    .attr('id', 'ac_money')
	    .attr('x',function(d,i){
	        return x(i)+w2*(d.father+1)/4;
	    })
	    .attr('y',function(d,i){
	        return y(d.ac_money);
	    })
	    .attr('width',w2)
	    .attr('height',function(d,i){
	        return height - y(d.ac_money) - padding;
	    })
	    .attr('fill','steelblue')

	svg2.selectAll('rect#ac_item')
	    .data(data2)
	    .enter()
	    .append('rect')
	    .attr('id', 'ac_item')
	    .attr('x',function(d,i){
	        return x(i)+w2*(d.father+5)/4;
	    })
	    .attr('y',function(d,i){
	        return y2(d.ac_item);
	    })
	    .attr('width',w2)
	    .attr('height',function(d,i){
	        return height - y2(d.ac_item) - padding;
	    })
	    .attr('fill','orange')
	let text_gene = function(d){
		let father_name = ["数理科学部","化学科学部","生命科学部","地球科学部","工程与材料科学部","信息科学部","管理科学部","医学科学部"];
		return "科学部："+father_name[d.father]+"\n受理项数："+d.app_item
			+"\n受理金额："+d.app_money+"\n批准项数："+d.ac_item+"\n批准金额："+d.ac_money;
	}
	svg2.selectAll('rect')
		.on("mouseover", function(d) {
			d3.select(this).attr("fill2", d3.select(this).attr("fill"))
			d3.select(this).attr("fill", "red")
			//Get this bar's x/y values, then augment for the tooltip
			var xPosition = parseFloat(d3.select(this).attr("x"))+600;
			var yPosition = parseFloat(d3.select(this).attr("y"))+100;
			//Update the tooltip position and value
			d3.select("#tooltip")
				//.html(d.subject)
				.style("left", xPosition + "px")
				.style("top", yPosition + "px")						
				.select("#value")
				.text(text_gene(d));
			d3.select("#tooltip")
				.select("#title")
				.text(d.subject);
			//Show the tooltip
			d3.select("#tooltip").classed("hidden", false);
	    })
	    .on("mouseout", function() {   
	    	d3.select(this).attr("fill", d3.select(this).attr("fill2"))
			//Hide the tooltip
			d3.select("#tooltip").classed("hidden", true);	
	    });
    let axisX = d3.axisBottom().scale(x).ticks(1);
	let axisY = d3.axisLeft().scale(y).ticks(8);
	svg2.append('g').attr('transform',`translate(0,${height-padding})`).call(axisX);
	svg2.append('g').attr('transform',`translate(${padding},0)`).call(axisY);
	let legend=svg2.append("g");
	addLegend(legend);
})