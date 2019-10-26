function addLegend(legend)
{
	let lineNames = ["受理金额","受理项数","批准金额","批准项数"];
	let lineColor = ["gray", "rgb(128,138,135)", "steelblue", "orange"];
	let textGroup=legend.selectAll("text")
		.data(lineNames);
	textGroup.exit().remove();legend.selectAll("text")
		.data(lineNames)
		.enter()
		.append("text")
		.text(function(d){return d;})
		.attr("class","legend")
		.attr("x", function(d,i) {return i*100;})
		.attr("y",0)
		.attr("fill",function(d,i){ return lineColor[i];}); 

	let rectGroup=legend.selectAll("rect")
		.data(lineNames);
	rectGroup.exit().remove();
		legend.selectAll("rect")
		.data(lineNames)
		.enter()
		.append("rect")
		.attr("x", function(d,i) {return i*100-20;})
		.attr("y",-10)
		.attr("width",12)
		.attr("height",12)
		.attr("fill",function(d,i){ return lineColor[i];});
	//legend.attr("transform","translate("+((w-lineNames.length*100)/2)+","+(h-10)+")");
}