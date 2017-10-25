  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const START_DAY = 24;
  let YEARS = {
	2017: {},
	2018: {}
  };
  const WORK_STATES = {
    0: true,
    1: true,
    2: false,
    3: false
  };
  var vm = new Vue({
    el: "#container",
    data: {
        'time': new Date(),
        headerDays: DAYS,
        moduloCounter: 0,
        calendar: YEARS,
        workStates: WORK_STATES,
		test: [],
		firstTurn: true,
		startDay: START_DAY
     },
     mounted() {
       this.calculate();
	   this.test.push(1);
     },
     methods: {
       calculate() {
		 for (var year in this.calendar) {
		   this.calculateMonth(year);
		 }		 
		 console.log(this.calendar);
       },
	   calculateMonth(year) {	    
		 if (Number(year) === this.time.getFullYear()) {			  
		   for (j = this.time.getMonth(); j < 12; j++) {			 
			 this.calendar[year][j] = [];
			 this.calculateDay(year, j);
		   }
	     } else {
		   for (j = 0; j < 12; j++) {			   
			 this.calendar[year][j] = [];
			 this.calculateDay(year, j); 
		   }	 
		 }	     
	   },
	   calculateDay(year, month) {
		 var daysInMonth = (new Date(year, month, 0).getDate());
		 if (this.firstTurn) {
		   for (i = 0; i < daysInMonth; i++) {
             if ((i + 1) < this.startDay) { 			   
               this.calendar[year][month].push({'day': i + 1});		 		   		   
		     } else {
			   this.moduloCounter %= 4;
               this.calendar[year][month].push({'day': i + 1, 'isWorking': this.workStates[this.moduloCounter]});		 		   		   	               
			   this.moduloCounter++
			 }
           } 
		   this.firstTurn = false;
		 } else {
           for (i = 0; i < daysInMonth; i++, this.moduloCounter++) {		
		     this.moduloCounter %= 4;
             this.calendar[year][month].push({'day': i + 1, 'isWorking': this.workStates[this.moduloCounter]});		 		   		   
           }  
		 }
	   },
       daysInMonth(year, month) {
         return new Date(year, month, 0).getDate();
       }
    },
    computed: {
      year() {
        return this.time.getFullYear()
      },
      month() {
        return this.time.getMonth() + 1
      },
      currentDay() {
        return this.time.getDate();
      }
    }
  })