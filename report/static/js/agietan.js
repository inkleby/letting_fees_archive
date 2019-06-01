hide_state = true;

    if (hide_state == true) {
        $(".extended").hide();
        $(".extended-row").hide();
        $('#master_expand_link').text("Show All Notes");
    } else {
        $('#master_expand_link').text("Hide All Notes");
        $(".expand-link").hide();
    };


    
// opens or closes all notes
$('#master_expand').click(function(event){
    event.preventDefault();
    $(".extended-row").toggle();
    $(".extended").fadeToggle();
    hide_state = !hide_state;
    if (hide_state == true) {
        $('#master_expand_link').text("Show All Notes");
        $(".expand-link").slideDown();
    } else {
        $('#master_expand_link').text("Hide All Notes");
        $(".expand-link").slideUp();
    };
});

//at change in section changes top menu and hash changes
var waypoints = $('.section-anchor').waypoint(function(direction) {
    
    if ($(this.element).is(':visible') == false){
    return 0;
    }
    
    if (direction == "down") {
        id = $(this.element).attr('id');
        title = $(this.element).text()
    } else {
        id = $(this.element).attr('prev');
        title = $("#"+id+".section-anchor").text()
    };
    
    //rename mobile title with section
    if (title) {
        $("#mobile-title").text(title);
    } else {
        short_name = $("body").attr("title")
        $("#mobile-title").text(short_name);
        }
   
    $("li").removeClass("active");
    $("#menu-" + id).addClass("active");
    $("#caret-menu-" + id).addClass("active");
    harmlessHashChange($("#" + id + ".anchor").attr('name'));
    adjustMenus(id);
}, {
  // offset very slightly the location of the section ahcor
  offset: function() {
    if ($(this.element).is(':visible') == true){
        return $(this.element).height() + 10;
    } else {
    return 0
    }
  },
  
  continuous:false}
  
);



//shows an individual footnote
$('.expand-footnotes').click(function(event){
    event.preventDefault();
    id = $(this).attr('id');
    
    $("#" + id + ".footnotes").animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
    window.setTimeout(Waypoint.refreshAll,500);
 });
 
//hides an individual footnote
 $('.hide-footnotes').click(function(event){
    event.preventDefault();
    id = $(this).parent().parent().attr('id');
    $("#" + id + ".footnotes").animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
    window.setTimeout(Waypoint.refreshAll,500);
 });

//shows an individual note
$('.expand-link').click(function(event){
    event.preventDefault();
    $(this).fadeOut();
    id = $(this).attr('id');
    $("#" + id + ".extended-row").show();
    $("#" + id + ".extended").animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
    window.setTimeout(Waypoint.refreshAll,500);
 });
 
//hides an individual note
 $('.hide-link').click(function(event){
    event.preventDefault();
    id = $(this).parent().parent().attr('id');
    $("#" + id + ".extended-row").hide();
    $("#" + id + ".extended").animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
    $("#" + id + ".expand-link").fadeIn();
    window.setTimeout(Waypoint.refreshAll,500);
 });
 
//show citation link as hovering over text
 $( ".content-row" ).hover(
  function() {
    id = $(this).attr('id')
    $('#' + id + ".cite-link" ).show();
  }, function() {
    id = $(this).attr('id')
    $('#' + id + ".cite-link" ).hide();
  }
);

var last_id = -1




function adjustMenus(id,future, past) {
//adjust what is visible in menus to just the nearby scope
    if (future === undefined) { future = 6; }
    if (future < 0) { future = 0}

    if (past === undefined) { past = 3; }
    if (past < 0) { past = 0}
    
    //if this is being called blind (usually resize - go with last known id)
    if (id === undefined) {
        id = last_id
    } else {
        id = parseInt(id)
        last_id = id
        }

    last_id = id
    bottombar = id - past
    topbar = id + future
    //unhide correct items
    for(var i=bottombar, len=topbar+1; i < len; i++){
        $("#menu-"+i).removeClass("hide-item");
        $("#caret-menu-"+i).removeClass("hide-item");
    }
    
    //hide incorrect items
    $(".top-menu-item:visible").each(function (){
    
        local = parseInt($(this).attr('item'))
        if (local == 0) {
            local = 1
            future = future + 1
        }
            if ((local <= bottombar) || (local > topbar)) {
                $(this).addClass("hide-item")
            }
        
    
    })
    
    $(".dropdown:visible").each(function (){
    
        local = parseInt($(this).attr('item'))
        if (local == 0) {
            local = 1
            future = future + 1
        }
            if ((local <= bottombar) || (local > topbar)) {
                $(this).addClass("hide-item")
            }
        
    
    })

    
    // set the << button to the previous section
    if (id > 1 && bottombar -1 > 0) {
        prev_link = $('[section='+ bottombar +']').attr('href')
        $("a#menu-prev").show().attr("href",prev_link);
    } else {
        $("a#menu-prev").hide();
    }
    
    
    next_link = $('[section='+ (topbar + 1) +']')
    
    if (next_link.length > 0) {
        $("a#menu-next").show().attr("href",next_link.attr('href'));
    } else {
        $("a#menu-next").hide()
    }
    
    //if we're now on two lines - adjust downwards
    if (($("#large-menu").height() > ($("#brand").height() * 3)) ){
        if (past > 1 ){
            adjustMenus(id,future,past-1)
        } else if (future > 0) {
            adjustMenus(id,future-1,past)
        }
    } else {

    }
    
}


function closeCatchup(){  
        $("#catchup").fadeOut()
        return false
}

function harmlessHashChange(newhash){
//changes the hash in the address bar without moving the page
    
    var isiPad = navigator.userAgent.match(/iPad/i) != null;
    
    
    if (currently_moving == false && isiPad == false) {

        $("a[name=temp]").each(function() {
            old = $(this).attr("temp_name")
            $(this).attr('name',old)
        })

        if (newhash != "temp" ) {
            if (typeof newhash == "undefined") {
                window.location.hash = "start";
            } else {
                existing = $('a[name="' + newhash + '"]')
                existing.attr('temp_name',newhash);
                existing.attr('name',"temp");
                window.location.hash = newhash;
                window.setTimeout(function() {existing.attr('name',newhash)},1);

            }
        }
    
    }
}

//extract the catchup information
function assembleCatchup(section_id,current_sub) {

    start = '<div class="row" id="catchup"><div class="col-md-offset-2 col-md-8"><div class="extended"><p><b>Catch Up </b>(<a href="" onclick="return closeCatchup()">close</a>):</p><ul>'
    end = '</ul></div></div></div>'
    body = start
    count = 0
    int_section = parseInt(section_id)
    int_current = parseInt(current_sub)
    //get sections catchup
      for (i = 1; i <= int_section; i++) {
        catch_up = sections[i]['catch_up']
        if (catch_up != ""){
            link = $("#" + i + ".linkable")

            body += '<li>' + catch_up + ' (<a href="#' + link.attr('name') + '">link</a>)</li>' 
            count += 1
        }
      } 

      current_section = sections[int_section]['sub']
      
      for (var key in current_section) {
          if (parseInt(key) < int_current){
            link = $("#" + int_section + "g" + key + ".linkable")
            body += '<li>' + current_section[key] + ' (<a href="#' + link.attr('name') + '">link</a>)</li>'
            count += 1
          }
      }
      
      body += end
      if (count > 0){
        return body
        } else {
        return ""
        }
};
    




var currently_moving = false

function gotoTarget(target,addText){
    //clever hash link that adds markers around the right place
    para_id = target.attr('name')

            if (addText && currently_moving == false) {
            currently_moving = true
            $('#' + para_id + ".catchup-link" ).show();
            $("#" + para_id + ".side-bar").prepend( "<p>Entered Here</p>" )
            }
            catchup = assembleCatchup(target.attr("parent"),target.attr('last_title'))
            $("#" + para_id+ ".content-row").before(catchup)
            $('html,body').scrollTop(target.offset().top - 60) //offsets for fixed header

            parent = $("#" + target.attr('parent') + ".anchor")
            harmlessHashChange(parent.attr('name'));
            $("#" + para_id + ".content-row").addClass("highlighted-content")
            window.setTimeout(function() {$("#" + para_id + ".content-row").removeClass("highlighted-content")},20000)
            currently_moving = false;
}

function gotoHash(hash,addText){
//decodes the clever hash function
      key_areas = hash.split(".") //0 - section, 1 paragraph, 2 - prime, 3 - start, 4-end
      key_areas[0] = key_areas[0].substring(1) //remove hash

      if (key_areas[0] == "tag") {
        tag = '[tag=' + key_areas[1] +']'
        options = [tag]
      } else {
      
          key_target = '[key=' + key_areas[2] +']'
          start_end = '[start_key=' + key_areas[3] +']' + '[end_key=' + key_areas[4] +']'
          start_para ='[start_key=' + key_areas[3] +']' + '[name=' + key_areas[1] +']'
          end_para = '[end_key=' + key_areas[4] +']' + '[name=' + key_areas[1] +']'
          start ='[start_key=' + key_areas[3] +']'
          end = '[end_key=' + key_areas[4] +']'
          para = '[name=' + key_areas[1] +']' + '[parent=' + key_areas[0] +']'
          section = '[section=' + key_areas[0] +']'
          options = [key_target,start_end,start_para,end_para,start,end,para,section]
          
      }
      
      for(var i=0, len=options.length; i < len; i++){
          target = $(options[i]);
          if (target.length) {
          
            gotoTarget(target,addText);
            break;
          }
      }
      

}

//grab local # links
 $(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
&& location.hostname == this.hostname && $(this).hasClass('cite-copy') == false) {
        var splits = this.hash.split(".")
        if (splits.length > 2) {
            return gotoHash(this.hash.slice(1),false);

        } else {
            new_hash = this.hash.slice(1)
            if (new_hash == "index") {
            if ($("div#index").is(':visible') == false) {
                $("div#index").show()
                Waypoint.refreshAll()
            }
            } else {
                if ($("div#index").is(':visible') == true) {
                    $("div#index").hide()
                    Waypoint.refreshAll()
                }
            }
            $('html,body').scrollTop($('a[name="' + new_hash + '"]').offset().top - 60)
            return false
            }
      
      
    } else {
    return false;
    }
  });
  
var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sept";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";
  
function getNow(){
	var currentDate = new Date()
	var day = currentDate.getDate()
	var mon = currentDate.getMonth() + 1
	var year = currentDate.getFullYear()
	return day + " " + month[mon-1] + ". " + year
}


 

  
function citeBox(dialog_title,link){
    //generates pretty citation box
    title = $("body").attr("title")
    full_title = $("body").attr("full-title")
    cite_author = $("body").attr("cite-author")
    year = $("body").attr("year")
	org =  $("body").attr("org")
    swal({
    title: dialog_title,
    text: '<a href="' + link+ '">' + title + ': Paragraph '+ $(this).attr("id") + '</a>' + 
    '<br><br>Cite As:<br><span class="cite"> ' + cite_author + '. (' + year + '). '+ full_title + ' (Paragraph '+ $(this).attr("id") + '). [online] , ' + org + '. Available at: '+ link + ' [Accessed ' + getNow() + ']</span>',
    html: true,
    confirmButtonText: "OK" });
}

 
 
 //copies link to clipboard - disables further activity
$(".cite-copy").click(function(e) {
    var link = window.location.href
	
	if (link.indexOf("#") != -1) {
		link = link.split('#')[0]
	}
	
	link = link + $(this).attr("href")
	
	
    clipboard.copy(link).then(
      function(){citeBox("Link added to Clipboard!",link);},
      function(err){citeBox("Copy Link From Below!",link);})
  

    e.stopPropagation();
});
 
 $("a.caret-link").click(function() {
   parent_id = $(this).attr("parent")
   $("#"+ parent_id + ".dropdown-toggle").dropdown("toggle");
});
  
$('.nav-link').click(
    function () {
        $('.navbar-collapse').removeClass('in');
    }
);

$(window).load(function() {


      //Executed on page load with URL containing an anchor tag.
      if($(location.href.split("#")[1])) {
          var hash = '#'+location.href.split("#")[1];
          if (hash.length > 2) {
          return gotoHash(hash,true);
          }
          }
        
    });


    function followHash() {
        //allows hash moves within a document
        var splits = location.hash.split(".")
        if (splits.length > 2) {
            gotoHash(location.hash);
            }
    }

    window.onhashchange = followHash;
    window_resize()
   
});

function window_resize() {
    //fix waypoints on window resize
    adjustMenus();
    Waypoint.refreshAll()
}


window.onresize = window_resize;
