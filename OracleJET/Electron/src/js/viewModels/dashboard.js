define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojlegend', 'ojs/ojchart'],
    function (oj, ko) {
    function ChartModel() {
        var self = this;
        // Attribute Groups Handler for Consistent Coloring
        var attrGroups = new oj.ColorAttributeGroupHandler();

        var blacSeries = [{name: "Series 1", items: [74, 62, 70, 76]},
            {name: "Series 2", items: [50, 38, 46, 54]},
            {name: "Series 3", items: [34, 22, 30, 32]},
            {name: "Series 4", items: [18, 6, 14, 22]}];
        var bubbleSeries = [{name: "Series 1", items: [{x: 15, y: 25, z: 5}, {x: 25, y: 30, z: 12}, {x: 25, y: 45, z: 12}, {x: 10, y: 50, z: 5}]},
            {name: "Series 2", items: [{x: 15, y: 15, z: 8}, {x: 25, y: 10, z: 7}, {x: 40, y: 50, z: 25}, {x: 20, y: 40, z: 15}]},
            {name: "Series 3", items: [{x: 10, y: 10, z: 8}, {x: 18, y: 55, z: 10}, {x: 30, y: 40, z: 15}, {x: 5, y: 15, z: 3}]},
            {name: "Series 4", items: [{x: 8, y: 20, z: 6}, {x: 11, y: 30, z: 8}, {x: 5, y: 35, z: 10}, {x: 40, y: 20, z: 11}]}];
        var scatterSeries = [{name: "Series 1", items: [{x: 15, y: 25}, {x: 25, y: 30}, {x: 25, y: 45}, {x: 10, y: 50}]},
            {name: "Series 2", items: [{x: 15, y: 15}, {x: 25, y: 10}, {x: 40, y: 50}, {x: 20, y: 40}]},
            {name: "Series 3", items: [{x: 10, y: 10}, {x: 18, y: 55}, {x: 30, y: 40}, {x: 5, y: 15}]},
            {name: "Series 4", items: [{x: 8, y: 20}, {x: 11, y: 30}, {x: 5, y: 35}, {x: 40, y: 20}]}];


        var groups = ["Group A", "Group B", "Group C", "Group D"];

        self.blacSeriesValue = ko.observableArray(blacSeries);
        self.bubbleSeriesValue = ko.observableArray(bubbleSeries);
        self.scatterSeriesValue = ko.observableArray(scatterSeries);
        self.groupsValue = ko.observableArray(groups);

        var selected = [{series: "Series 1", group: "Group A"},
            {series: "Series 1", group: "Group B"},
            {series: "Series 1", group: "Group C"},
            {series: "Series 1", group: "Group D"}
        ];
        self.selectedItemsValue = ko.observableArray(selected);
        
        // Legend Data
        var legendSections = [{items : [{text : "Series 1",  color : attrGroups.getValue("Series 1")},
                                        {text : "Series 2",  color : attrGroups.getValue("Series 2")},
                                        {text : "Series 3",  color : attrGroups.getValue("Series 3")},
                                        {text : "Series 4",  color : attrGroups.getValue("Series 4")}]}]; 
        self.legendSections = ko.observableArray(legendSections);
        
        // Listen to selectInput and show live update of other components
        self.scatterSelectInput = function(event, ui){
            $("#bubbleChart").ojChart('option', 'selection', ui['items']);
            $("#barChart").ojChart('option', 'selection', ui['items']);
            $("#areaChart").ojChart('option', 'selection', ui['items']);
        }
        self.bubbleSelectInput = function(event, ui){
            $("#scatterChart").ojChart('option', 'selection', ui['items']);
            $("#barChart").ojChart('option', 'selection', ui['items']);
            $("#areaChart").ojChart('option', 'selection', ui['items']); 
        }
        self.barSelectInput = function(event, ui){
            $("#scatterChart").ojChart('option', 'selection', ui['items']);
            $("#bubbleChart").ojChart('option', 'selection', ui['items']);
            $("#areaChart").ojChart('option', 'selection', ui['items']); 
        }
        self.areaSelectInput = function(event, ui){
            $("#scatterChart").ojChart('option', 'selection', ui['items']);
            $("#bubbleChart").ojChart('option', 'selection', ui['items']);
            $("#barChart").ojChart('option', 'selection', ui['items']); 
        }
      
    }
    
    var chartModel = new ChartModel();

    return chartModel;
}); 

