define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 
            'ojs/ojbutton', 'ojs/ojinputnumber', 'ojs/ojgantt'],  
  function(oj, ko)
  {
    var week = 7*24*60*60*1000; // milliseconds

    /**
    * Generates random date
    * @param {Date} start start of time range
    * @param {Date} end end of time range
    * @return {Date} Random date
    */
    function randomDate(start, end) 
    {
      return new Date(start.getTime() + Math.random() * 
      (end.getTime() - start.getTime()));
    };

    /**
    * Generates task with random start and end dates
    * @param {string} id the task id
    * @param {string} label the task label
    * @param {string} taskStyle the CSS style string to apply on the task bar
    * @return {Object} The task object
    */
    function randomTask(id, label, taskStyle)
    {
      var start, end;
      start = randomDate(new Date(2016, 0, 1), new Date(2016, 4, 1));
      end = randomDate(new Date(start), new Date(start.getTime() + 4 * week));
      return {id: id, start: start.getTime(), end: end.getTime(), label: label, labelPosition: 'end', style: taskStyle}
    };

    /**
    * Updates give task with new random start and end dates
    * @param {Object} task the task object of interest
    */
    function updateTask(task)
    {
      var start, end;
      start = randomDate(new Date(2016, 0, 1), new Date(2016, 4, 1));
      end = randomDate(new Date(start), new Date(start.getTime() + 4 * week));
      task.start = start.getTime();
      task.end = end.getTime();
    }
  
    /**
     * Generates random data
     * @param {Number} numRows The number of rows
     * @param {Number} numTasksPerRow The number of tasks per row
     * @return {Object} Data object containing random data
     */
    function generateRandomData(numRows, numTasksPerRow) 
    {
      var data = [], i, dateRandom, date, label, taskStyle
      
      for (i = 0; i < numRows; i++) {
        data.push({'id': "row_" + i, 'tasks': []});
        for (j = 0; j < numTasksPerRow; j++) {
          taskStyle = '';
          if (i === 0 && j === 2) // task to be moved
            taskStyle = 'fill: #ed6647;'; 
          else if (i === 1 && j === 2) // task to be removed
            taskStyle = 'fill: #68c182;'; 
          else if (i === 2) // tasks in added/removed row
            taskStyle = 'fill: #fad55c;'
          data[i]['tasks'].push(randomTask('t' + i + '_' + j, 'Label '+ i + '_' + j, taskStyle))
        }
      }
      return data;
    }; 
  
    function GanttModel() 
    {   
      var self = this, numRows = 6, numTasksPerRow = 3;

      self.rowsValue = ko.observableArray(generateRandomData(numRows, numTasksPerRow));      
      
      // update task start/end dates
      self.updateData = function(updateObservable){
        var ganttData = self.rowsValue();
        for (var i = 0; i < ganttData.length; i++)
        {
          var rowTasks = ganttData[i].tasks;
          for (var j = 0; j < rowTasks.length; j++)
          {
            var task = rowTasks[j];
            updateTask(task);
          }
        }
        if (updateObservable)
          self.rowsValue(ganttData);  
        else
          return ganttData;
      };

      // add/remove task from second row
      self.addRemoveTask = function(updateObservable)
      {
        var ganttData = self.rowsValue();
        var secondRowTasks = ganttData[1].tasks;
        if (secondRowTasks.length <= numTasksPerRow - 1)
        {
          // add random task
          var id = 't' + 1 + '_' + (numTasksPerRow - 1);
          var label = 'Label '+ 1 + '_' + (numTasksPerRow - 1);
          var task = randomTask(id, label, 'fill: #68c182;');
          secondRowTasks.push(task);
        }
        else
        {
          // remove task
          secondRowTasks.pop();
        }
        if (updateObservable)
          self.rowsValue(ganttData);
        else
          return ganttData;
      };

      // move task from last row to first row
      self.moveTask = function(updateObservable)
      {
        var ganttData = self.rowsValue();
        var firstRowTasks = ganttData[0].tasks;
        var lastRowTasks = ganttData[ganttData.length - 1].tasks;
        if (firstRowTasks.length < numTasksPerRow)
        {
          // move task from last row to first row
          var taskToMove = lastRowTasks.pop();
          updateTask(taskToMove);
          firstRowTasks.push(taskToMove);
        }
        else
        {
          // move task from first row to last row
          taskToMove = firstRowTasks.pop();
          updateTask(taskToMove);
          lastRowTasks.push(taskToMove);
        }
        if (updateObservable)
          self.rowsValue(ganttData);
        else
          return ganttData;
      };

      // add/remove third row
      self.addRemoveRow = function(updateObservable)
      {
        var ganttData = self.rowsValue();
        if (ganttData.length < numRows)
        {
          // add third row
          var newRow = {'id': "row_2", 'tasks': []}
          for (var j = 0; j < numTasksPerRow; j++) {
            newRow.tasks.push(randomTask('t' + 2 + '_' + j, 'Label '+ 2 + '_' + j, 'fill: #fad55c;'))
          }
          ganttData.splice(2, 0, newRow);
        }
        else
        {
          // remove third row
          ganttData.splice(2, 1);
        }

        if (updateObservable)
          self.rowsValue(ganttData);
        else
          return ganttData;
      };

      // rerender a bunch of different changes to the data and see the animation
      self.multipleUpdates = function()
      {
        var ganttData = self.rowsValue();
        ganttData = self.updateData(false);
        ganttData = self.addRemoveTask(false);
        ganttData = self.moveTask(false);
        ganttData = self.addRemoveRow(false);
        self.rowsValue(ganttData);
      };

    };
    return GanttModel;
  }
);