define(['ojs/ojcore', 'knockout', 'ojs/ojknockout',
    'basemaps/ojthematicmap-usa-states', 'basemaps/ojthematicmap-usa-cities',
     'ojs/ojthematicmap', 'ojs/ojlegend'], function(oj, ko) {
    function thematicMapModel(handler) {
      var self = this;
      // convert raw data to a knockout observable array of area objects
      var regions = [
        {state: "AL", region: "East"},
        {state: "AK", region: "Central"},
        {state: "AZ", region: "West"},
        {state: "AR", region: "Central"},
        {state: "CA", region: "West"},
        {state: "CO", region: "West"},
        {state: "CT", region: "East"},
        {state: "DE", region: "East"},
        {state: "DC", region: "East"},
        {state: "FL", region: "East"},
        {state: "GA", region: "East"},
        {state: "HI", region: "West"},
        {state: "ID", region: "West"},
        {state: "IL", region: "Central"},
        {state: "IN", region: "East"},
        {state: "IA", region: "Central"},
        {state: "KS", region: "Central"},
        {state: "KY", region: "East"},
        {state: "LA", region: "Central"},
        {state: "ME", region: "East"},
        {state: "MD", region: "East"},
        {state: "MA", region: "East"},
        {state: "MI", region: "East"},
        {state: "MN", region: "Central"},
        {state: "MS", region: "East"},
        {state: "MO", region: "Central"},
        {state: "MT", region: "West"},
        {state: "NE", region: "Central"},
        {state: "NV", region: "West"},
        {state: "NH", region: "East"},
        {state: "NJ", region: "East"},
        {state: "NM", region: "West"},
        {state: "NY", region: "East"},
        {state: "NC", region: "East"},
        {state: "ND", region: "Central"},
        {state: "OH", region: "East"},
        {state: "OK", region: "Central"},
        {state: "OR", region: "West"},
        {state: "PA", region: "East"},
        {state: "RI", region: "East"},
        {state: "SC", region: "East"},
        {state: "SD", region: "Central"},
        {state: "TN", region: "East"},
        {state: "TX", region: "Central"},
        {state: "UT", region: "West"},
        {state: "VT", region: "East"},
        {state: "VA", region: "East"},
        {state: "WA", region: "West"},
        {state: "WV", region: "East"},
        {state: "WI", region: "Central"},
        {state: "WY", region: "West"}];
      self.regionData = ko.observableArray();
      for (var i = 0; i < regions.length; i++) {
        self.regionData.push({id: i.toString(),
          color: handler.getValue(regions[i]["region"]),
          location: regions[i]["state"],
          shortDesc: regions[i]["region"]});
      }

      var users = [
        {state: "AL", users: 3070},
        {state: "AK", users: 2908},
        {state: "AZ", users: 592},
        {state: "CO", users: 8990},
        {state: "CT", users: 3234},
        {state: "DE", users: 402},
        {state: "HI", users: 6023},
        {state: "ID", users: 1902},
        {state: "IL", users: 2334},
        {state: "IN", users: 3421},
        {state: "KS", users: 321},
        {state: "KY", users: 902},
        {state: "MD", users: 913},
        {state: "MA", users: 6821},
        {state: "MI", users: 6113},
        {state: "MN", users: 562},
        {state: "MS", users: 191},
        {state: "MO", users: 802},
        {state: "NV", users: 2981},
        {state: "ND", users: 3001},
        {state: "OH", users: 787},
        {state: "OK", users: 7893},
        {state: "OR", users: 2318},
        {state: "PA", users: 9271},
        {state: "RI", users: 235},
        {state: "SC", users: 5921},
        {state: "VT", users: 5732},
        {state: "WV", users: 2001}];
      self.userData = ko.observableArray();
      for (var i = 0; i < users.length; i++) {
        self.userData.push({id: i.toString(),
          color: handler.getValue(users[i]["users"] > 1000 ?
                                  'more than 1k' : 'more than 100'),
          shape: 'human', width: 25, height: 25,
          location: users[i]["state"],
          shortDesc: users[i]["users"] + " daily users"});
      }

      var layersAr = [{layer: 'states', labelDisplay: 'off',
                        areaDataLayer: {id: 'adl1',
                                        areas: self.regionData,
                                        markers: self.userData}}];
      /* knockout evaluation is not supported for nested objects so we must bind
       * a computed observable to the top level areaLayers, which will create
       * dependencies on nested knockout observables and be updated when the
       * nested observables are updated */
      self.layers = ko.computed(function() {
        return ko.toJS(layersAr)
      });

      var servers = [
        {city: "NV_RENO", x: -119.8219, y: 39.5272},
        {city: "NY_YONKERS", x: -73.8644, y: 40.9414},
        {city: "NC_DURHAM", x: -78.9072, y: 35.9886},
        {city: "CA_HAYWARD", x: -122.0808, y: 37.6689},
        {city: "WA_OLYMPIA", x: -122.8931, y: 47.0425},
        {city: "MO_ST__LOUIS", x: -90.1978, y: 38.6272},
        {city: "TX_DALLAS", x: -96.7967, y: 32.7758}];
      self.serverData = ko.observableArray();
      for (var i = 0; i < servers.length; i++) {
        self.serverData.push({
          id: i.toString(),
          source: "css/images/building.png",
          width: 30,
          height: 30,
          x: servers[i]["x"],
          y: servers[i]["y"],
          shortDesc: "office location"});
      }

      var pdlAr = [{id: 'pdl1', markers: self.serverData}];
      self.points = ko.computed(function() {
        return ko.toJS(pdlAr)
      });
    }

    var handler = new oj.ColorAttributeGroupHandler();
    var mapModel = new thematicMapModel(handler);

    var legendSections = [
      {title: "Regions", titleStyle: 'font-size:14px;font-weight:bold;',
        items: [
          {text: "West",
           color : handler.getValue("West"),
           markerShape: "square"},
          {text: "Central",
           color: handler.getValue("Central"),
           markerShape: "square"},
          {text: "East",
           color: handler.getValue("East"),
           markerShape: "square"}
      ]},
      {title: "Daily Users", titleStyle: 'font-size:14px;font-weight:bold;',
        items: [
          {text: "More than 1,000",
           color: handler.getValue("more than 1k"),
           markerShape: "human"},
          {text: "More than 100",
           color: handler.getValue("more than 100"),
           markerShape: "human"}
      ]},
      {items: [{text: "Office Locations",
                source:"css/images/building.png",
                symbolType: "image"}]}
    ];

    mapModel.legendSections = legendSections;

    return mapModel;

    // $(document).ready(
    //   function() {
    //     ko.applyBindings(mapModel,
    //       document.getElementById('thematicMap-container'));
    //     ko.applyBindings({legendSections:ko.observableArray(legendSections)},
    //       document.getElementById('legend-container'));
    //   }
    // );
  });