document.addEventListener('DOMContentLoaded', function() {
  //http://servicea.catsone.com/careers/index.php?m=portal&a=apply&jobOrderID=12800090&portalID=1777
  var filterElem = document.querySelectorAll('.accordion-title li');
  // var filtered = [];
  var filters = {
    sectors: [],
    region: [],
    statut: [],
    immo: [],
    archi: [],
    build: [],
  };

  var jobList = document.querySelectorAll('#job-list a');

  for (var i = 0; i < filterElem.length; i++) {
    filterElem[i].addEventListener('click', function(e) {




      var dataFilter = e.currentTarget.dataset['filter'];
      var elem = e.currentTarget.querySelector('input');
      elem.checked = !elem.checked;
      
      $('#job-list').addClass('hide-me');

      if(elem.checked) {
        filters[elem.name].push(parseInt(elem.value));
      }else {
        var index = filters[elem.name].indexOf(parseInt(elem.value));
  			if(index > -1) {
  				filters[elem.name].splice(index, 1);
  			}
      }
      for (var i = 0;i < jobList.length;i++){
        jobList[i].classList.add('show');
      }

      for (var i = 0;i < jobList.length;i++){
        if (filters.region.length > 0 && filters.region.indexOf(parseInt(jobList[i].dataset['region'])) < 0) {
          jobList[i].classList.remove('show');
        }
        if(filters.sectors.length > 0 && filters.sectors.indexOf(parseInt(jobList[i].dataset['sector'])) < 0) {
          jobList[i].classList.remove('show');
        }
        if (filters.statut.length > 0 && filters.statut.indexOf(parseInt(jobList[i].dataset['statut'])) < 0) {
          jobList[i].classList.remove('show');
        }
        if (filters.immo.length > 0 && filters.immo.indexOf(parseInt(jobList[i].dataset['immo'])) < 0) {
          jobList[i].classList.remove('show');
        }
        if (filters.archi.length > 0 && filters.archi.indexOf(parseInt(jobList[i].dataset['archi'])) < 0) {
          jobList[i].classList.remove('show');
        }
        if (filters.build.length > 0 && filters.build.indexOf(parseInt(jobList[i].dataset['build'])) < 0) {
          jobList[i].classList.remove('show');
        }
      }
      var noResults = document.getElementsByClassName('no-results')[0].classList;
      if(document.querySelectorAll('#job-list a.show').length === 0) {
        noResults.remove('hide'); 
      }else {
        noResults.add('hide'); 
      }

      setTimeout(function(){ 
        $('#job-list').removeClass('hide-me');

    
      $('html, body').animate( { scrollTop: 0 }, 100 );
 



      }, 200)

    });
  }

  var accordion = document.querySelectorAll('.accordion-title span');
  for(var i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function (e) {
      var parentElem = e.currentTarget.parentNode;
      parentElem.classList.toggle('is-opened')
  		if(parentElem.classList.contains('is-opened')) {
  			parentElem.style.height = ((e.currentTarget.dataset.height*33)+89) + 'px';
  		}else {
  			parentElem.style.height = '63px';
  		}
    })
  }

  var search = document.querySelector('.search-form-parent form');
  search.addEventListener('submit', function(e) {

    $('body').addClass('search-submit');

    location.href = location.origin+''+location.pathname+'?search='+ e.target[0].value;
    e.preventDefault();
  });

  // boucler sur les cards et en faire un dictionnaire pour afficher les filtres
  var list_filters = {
    region: {},
    statut: {},
    immo: {},
    archi: {},
    build: {},
  };

  var filters_name = [];

  for(var key in list_filters) {
    filters_name.push(key);
  }

  for (var i = 0; i < jobList.length; i++) {
    var elem = jobList[i];
    
    for (var j = 0; j < filters_name.length; j++) {
      if (elem.dataset[filters_name[j]] !== '') {
        var elem_dataset = parseInt(elem.dataset[filters_name[j]]);
        list_filters[filters_name[j]][elem_dataset] = (list_filters[filters_name[j]][elem_dataset] ? list_filters[filters_name[j]][elem_dataset] : 0) + 1;
      }
    }
  }

  for(var i = 0; i < filters_name.length; i++) {
    document.querySelector('.' + filters_name[i] + ' li').classList.remove('show');
    var n = 0;
    for (var key in list_filters[filters_name[i]]) {
      var elem = document.querySelector('.' + filters_name[i] + ' li[data-filter="' + key + '"]');
      elem.classList.add('show');
      elem.querySelector('.n-filter').innerHTML = "("+list_filters[filters_name[i]][key]+")";
      elem.querySelector('.n-filter').classList.add('show');
      n++;
    }
    document.querySelector('.' + filters_name[i] +' .label-accordion').dataset.height = n;
  }

});
