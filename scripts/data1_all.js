let rowConverter1 = function(d) {
	return {
		subject: d.subject,
		ac_money: parseFloat(d.ac_money),
		ac_item: parseFloat(d.ac_item),
		app_item: parseFloat(d.app_item),
		app_money: parseFloat(d.app_money),
		en_name: d.en_name
	}
}
let data;
d3.csv("data1.csv", rowConverter1, function(d){
	let w = 30, //柱宽度
	    height = 400,   //画布高度
	    width = 600,  //画布宽度
	    left = 50,
	    bottom = 20;
	    padding = 40;
    let svg = d3.select('body')
	    .append('svg')
	    .attr('width',width)
	    .attr('height',height)
	    .style('margin-left','100px')
	    .style('padding','20px')
	    .style('border','1px solid green')
	data = d;
	let len = data.length;
	//创建线性比例尺
	let x = d3.scaleLinear().domain([0,len]).range([padding, width-padding]);
	let y = d3.scaleLinear().domain([0,d3.max(data,function(d) {return d.app_money;})]).range([height-padding,padding]);
	let y2 = d3.scaleLinear().domain([0,d3.max(data,function(d) {return d.app_item;})]).range([height-padding,padding]);

	//绘制数据柱状
	svg.selectAll('rect#app_money')
	    .data(data)
	    .enter()
	    .append('rect')
	    .attr('id', 'app_money')
	    .attr('x',function(d,i){
	        return x(i)+w/4;
	    })
	    .attr('y',function(d,i){
	        return y(d.app_money);
	    })
	    .attr('width',w)
	    .attr('height',function(d,i){
	        return height - y(d.app_money) - padding;
	    })
	    .attr('fill','gray')

	svg.selectAll('rect#app_item')
	    .data(data)
	    .enter()
	    .append('rect')
	    .attr('id', 'app_item')
	    .attr('x',function(d,i){
	        return x(i)+5*w/4;
	    })
	    .attr('y',function(d,i){
	        return y2(d.app_item);
	    })
	    .attr('width',w)
	    .attr('height',function(d,i){
	        return height - y2(d.app_item) - padding;
	    })
	    .attr('fill','rgb(128,138,135)')

	svg.selectAll('rect#ac_money')
	    .data(data)
	    .enter()
	    .append('rect')
	    .attr('id', 'ac_money')
	    .attr('x',function(d,i){
	        return x(i)+w/4;
	    })
	    .attr('y',function(d,i){
	        return y(d.ac_money);
	    })
	    .attr('width',w)
	    .attr('height',function(d,i){
	        return height - y(d.ac_money) - padding;
	    })
	    .attr('fill','steelblue')

	svg.selectAll('rect#ac_item')
	    .data(data)
	    .enter()
	    .append('rect')
	    .attr('id', 'ac_item')
	    .attr('x',function(d,i){
	        return x(i)+5*w/4;
	    })
	    .attr('y',function(d,i){
	        return y2(d.ac_item);
	    })
	    .attr('width',w)
	    .attr('height',function(d,i){
	        return height - y2(d.ac_item) - padding;
	    })
	    .attr('fill','orange')

	let axisX = d3.axisBottom().scale(x).ticks(len);
	let axisY = d3.axisLeft().scale(y).ticks(len);
	svg.selectAll('text#vals')
	    .data(data)
	    .enter()
	    .append('text')
	    .attr('id','vals')
	    .attr('fill','black')
	    .attr('text-anchor','middle')
	    .attr('font-size','12px')
	    .attr('x',function(d,i){
	        return x(i)+w/4;
	    })
	    .attr('y',function(d,i){
	        return y(d.ac_money) - padding;
	    })
	    .attr('dx',function(d,i){
	        return w / 2;
	    })
	    .attr('dy',padding/2)
	    .text(function(d){return d.ac_money})

	svg.selectAll('text#items')
	    .data(data)
	    .enter()
	    .append('text')
	    .attr('id','items')
	    .attr('fill','red')
	    .attr('text-anchor','middle')
	    .attr('font-size','12px')
	    .attr('x',function(d,i){
	        return x(i)+5*w/4;
	    })
	    .attr('y',function(d,i){
	        return y2(d.ac_item) - padding;
	    })
	    .attr('dx',function(d,i){
	        return w / 2;
	    })
	    .attr('dy',padding/2)
	    .text(function(d){return d.ac_item})

	svg.selectAll('text#appvals')
	    .data(data)
	    .enter()
	    .append('text')
	    .attr('id','appvals')
	    .attr('fill','black')
	    .attr('text-anchor','middle')
	    .attr('font-size','12px')
	    .attr('x',function(d,i){
	        return x(i)+w/4;
	    })
	    .attr('y',function(d,i){
	        return y(d.app_money) - padding;
	    })
	    .attr('dx',function(d,i){
	        return w / 2;
	    })
	    .attr('dy',padding/2)
	    .text(function(d){return d.app_money})

	svg.selectAll('text#appitems')
	    .data(data)
	    .enter()
	    .append('text')
	    .attr('id','items')
	    .attr('fill','red')
	    .attr('text-anchor','middle')
	    .attr('font-size','12px')
	    .attr('x',function(d,i){
	        return x(i)+5*w/4;
	    })
	    .attr('y',function(d,i){
	        return y2(d.app_item) - padding;
	    })
	    .attr('dx',function(d,i){
	        return w / 2;
	    })
	    .attr('dy',padding/2)
	    .text(function(d){return d.app_item})
	
	svg.selectAll('text#subject_name')
	    .data(data)
	    .enter()
	    .append('text')
	    .attr('id','subject_name')
	    .attr('fill','black')
	    .attr('text-anchor','middle')
	    .attr('font-size','10px')
	    .attr('x',function(d,i){
	        return x(i)+3*w/4;
	    })
	    .attr('y',function(d,i){
	        return height - padding/2;
	    })
	    .attr('dx',function(d,i){
	        return w / 2;
	    })
	    .attr('dy',padding/2)
	    .text(function(d){return d.subject})
	//绘制坐标轴
	svg.append('g').attr('transform',`translate(0,${height-padding})`).call(axisX);
	svg.append('g').attr('transform',`translate(${padding},0)`).call(axisY);
	let legend=svg.append("g");
	addLegend(legend);
})