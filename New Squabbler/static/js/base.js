function clearPost(val) {
	if (val === 'squab') {
		document.getElementById('posttextsquab').value = '';
	}
	else {
		document.getElementById('posttextprof').value = '';
	}
}

    function profileedit() {
        const button = document.getElementById('editprofbutton');
        const editdiv = document.getElementById('profileedit');
        const maindiv = document.getElementById('profiledisplay');
        const profblock = document.getElementById('profileblock');
        
        if (button.classList.contains('editprofbutclose')) {
            button.classList.remove('editprofbutclose');
            button.className += 'editprofbutopen';
            button.innerHTML = 'Cancel';
            editdiv.style.display = "block";
            maindiv.style.display = "none";
            profblock.style.minHeight = '495px';
        }
        
        else {
            button.classList.remove('editprofbutopen');
            button.className += 'editprofbutclose';
            button.innerHTML = 'Adjust Profile';
            editdiv.style.display = "none";
            maindiv.style.display = "block";
            document.getElementById("changeprofform").reset();
            profblock.style.minHeight = '370px';
        }
    }

function myFunction() {
  const profilediv = document.getElementById("myDropdown");
    profilediv.classList.toggle("show");
    
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
    	function infoOpen(objName) {
    		document.getElementById('smallinfopopup').style.display = "block";
    		window.scrollTo(0, 0);
    	}

    	function feedOpen(objValue) {
    		let objItem = document.getElementById(objValue);
    		const discoverDiv = document.getElementById('discoverfeeddiv');
    		const followingDiv = document.getElementById('followingfeeddiv')

    		if (objValue === 'feeddiscover') {
    			let otherItem = document.getElementById('feedfollowing');
    			if (objItem.classList.contains('openfeed')) {
    			}
    			else {
    				objItem.className += " openfeed";
    				objItem.classList.remove('closedfeed');
    				otherItem.className += " closedfeed"
    				otherItem.classList.remove('openfeed');
    				discoverDiv.classList.remove('inactivefeed');
    				discoverDiv.className += " activefeed";
    				followingDiv.classList.remove('activefeed');
    				followingDiv.className += " inactivefeed";

    			}
    		}

    		else {
    			let otherItem = document.getElementById('feeddiscover');
    			if (objItem.classList.contains('openfeed')) {

    			}
    			else {
    				objItem.className += " openfeed";
    				objItem.classList.remove('closedfeed');
    				otherItem.className += " closedfeed"
    				otherItem.classList.remove('openfeed');
    				followingDiv.classList.remove('inactivefeed');
    				followingDiv.className += " activefeed";
    				discoverDiv.classList.remove('activefeed');
    				discoverDiv.className += " inactivefeed";
    			}
    		}
    	}

    	function streamOpen(objValue) {
    		const objItem = document.getElementById(objValue);
    		const streamLine = document.getElementById('streamline');
    		const notifyLine = document.getElementById('notifyline')
            const streamDiv = document.getElementById('streamdiv');
            const notifyDiv = document.getElementById('notificationdiv');

    		if (objValue === 'streambutton') {
    			let otherItem = document.getElementById('notificationbutton');
    			if (objItem.classList.contains('openstream')) {
    			}
    			else {
    				objItem.className += " openstream";
    				objItem.classList.remove('closedstream');
    				otherItem.className += " closedstream"
    				otherItem.classList.remove('openstream');
    				streamLine.style.backgroundColor = "palevioletred";
    				streamLine.style.height = "1.5px";
    				streamLine.style.top = "44.5px";
                    streamDiv.classList.remove('inactiveside');
                    streamDiv.className += " activeside";
    				notifyLine.style.backgroundColor = "lightgray";
    				notifyLine.style.height = "0.5px";
    				notifyLine.style.top = "46px";
                    notifyDiv.classList.remove('activeside');
                    notifyDiv.className += " inactiveside";

    			}
    		}

    		else {
    			let otherItem = document.getElementById('streambutton');
    			if (objItem.classList.contains('openstream')) {

    			}
    			else {
    				objItem.className += " openstream";
    				objItem.classList.remove('closedstream');
    				otherItem.className += " closedstream"
    				otherItem.classList.remove('openstream');
    				streamLine.style.backgroundColor = "lightgray";
    				streamLine.style.height = "0.5px";
    				streamLine.style.top = "46px";
                    streamDiv.classList.remove('activeside');
                    streamDiv.className += " inactiveside";
    				notifyLine.style.backgroundColor = "palevioletred";
    				notifyLine.style.height = "1.5px";
    				notifyLine.style.top = "44.5px";
                    notifyDiv.classList.remove('inactiveside');
                    notifyDiv.className += " activeside";

    			}
    		}
    	}
    	function infoinexit() {
    		document.getElementById('smallinfopopup').style.display = 'none';
    	}
        function expandStream(curbtn) {
            let curtxt = curbtn.parentNode.parentNode.querySelector('.streambubbletexthold');
            if (curbtn.classList.contains('strmoverflowclosed')) {
                curbtn.classList.remove('strmoverflowclosed');
                curbtn.className += " strmoverflowopen";
                curbtn.innerHTML = "hide";
                curtxt.classList.remove('streambubbletext');
                curtxt.className += " streambubbletextexp";
            }
            else {
                curbtn.classList.remove('strmoverflowopen');
                curbtn.className += " strmoverflowclosed";
                curbtn.innerHTML = "expand";
                curtxt.classList.remove('streambubbletextexp');
                curtxt.className += " streambubbletext";
            }
            
        }

function menuOpen(objValue) {
    let objItem = document.getElementById(objValue);
    const discoverDiv = document.getElementById('solomenudiv');
    const followingDiv = document.getElementById('multimenudiv')

    if (objValue === 'solomenubutton') {
        let otherItem = document.getElementById('multimenubutton');
        if (objItem.classList.contains('openfeed')) {

        }
        else {
            objItem.className += " openfeed";
            objItem.classList.remove('closedfeed');
            otherItem.className += " closedfeed"
            otherItem.classList.remove('openfeed');
            discoverDiv.classList.remove('inactivefeed');
            discoverDiv.className += " activefeed";
            followingDiv.classList.remove('activefeed');
            followingDiv.className += " inactivefeed";

        }
    }

    else {
        let otherItem = document.getElementById('solomenubutton');
        if (objItem.classList.contains('openfeed')) {

        }
        else {
            objItem.className += " openfeed";
            objItem.classList.remove('closedfeed');
            otherItem.className += " closedfeed"
            otherItem.classList.remove('openfeed');
            followingDiv.classList.remove('inactivefeed');
            followingDiv.className += " activefeed";
            discoverDiv.classList.remove('activefeed');
            discoverDiv.className += " inactivefeed";
        }
    }
}

var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function successclose() {
    document.getElementById('successpopup').style.display = 'none';
}

function errorclose() {
    document.getElementById('errorpopup').style.display = 'none';
}

function otherinfobutton() {
    const infopopup = document.getElementById('opponentinfopopup');
    if (infopopup.classList.contains('inactive')) {
        infopopup.classList.remove('inactive');
        infopopup.className += " active";
    }
    else {
        infopopup.classList.remove('active');
        infopopup.className += " inactive";
    }
}

function otherdescbutton() {
    const descpopup = document.getElementById('opponentdescpopup');
    if (descpopup.classList.contains('inactive')) {
        descpopup.classList.remove('inactive');
        descpopup.className += " active";
    }
    else {
        descpopup.classList.remove('active');
        descpopup.className += " inactive";
    }
}

function postmenuopen(pid) {
    let post = document.getElementById(pid);
    let menu = post.querySelector('.postoptionmenu')
    if (menu.classList.contains('a')) {
        menu.classList.remove('a');
        menu.className += " i";
    }
    else {
        menu.classList.remove('i');
        menu.className += " a";
    }
}