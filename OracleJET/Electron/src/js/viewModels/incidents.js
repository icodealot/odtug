  define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojtagcloud'], 
    function (oj, ko) {
    function model(socialNetworks) {

      function getAgeGroup(ageGroups) {
        var teenager = ageGroups["14-17"];
        var youngAdult = ageGroups["18-34"];
        var middleAged = ageGroups["35-54"];
        if (teenager > youngAdult && teenager > middleAged)
            return "14-17";
        else if (youngAdult > teenager && youngAdult > middleAged)
            return "18-34";
        else
            return "35-54";
      }

      var handler = new oj.ColorAttributeGroupHandler({"14-17": "#267db3", "18-34": "#ed6647", "35-54": "#8561c8"});
      function getColor(ageGroups) {
        return handler.getValue(getAgeGroup(ageGroups));
      }

      var items = [];
      for (var i=0; i<socialNetworks.length; i++) {
        var network = socialNetworks[i];
        items.push({
          id: network['id'],
          label: network['id'],
          value: network['total'],
          shortDesc: network['id']+': Most popular amongst age group '+getAgeGroup(network),
          color: getColor(network)
        });
      }
      this.tags = ko.observableArray(items);

      this.valueButtonClick = function(data, event) {
        for (var i = 0; i < items.length; i++) {
          if (Math.random() < 0.4)
            items[i].value = Math.random()*100;
        }
        this.tags(items);
        return true;
      }

      var ageBrackets = ["14-17", "18-34", '35-54'];
      this.colorButtonClick = function(data, event) {
        for (var i = 0; i < items.length; i++) {
          if (Math.random() < 0.3)
            items[i].style = 'color:'+handler.getValue(ageBrackets[Math.round(Math.random()*3)]);
        }
        this.tags(items);
        return true;
      }

      var addIndex;
      this.itemButtonClick = function(data, event) {
        if (items.length <= 13) {
          var newItem = {
            id: "NewNetwork", value: 42.5,
            style: 'color:'+handler.getValue("14-17"), label: "New Network",
            shortDesc: "New Social Network"
          };
          addIndex = Math.round(Math.random()*4);
          items.splice(addIndex, 0, newItem);
        }
        else {
            items.splice(addIndex, 1);
        }
        this.tags(items);
        return true;
      }
    }

    return model;

  });