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
    const editDiv = document.getElementById('profileedit');
    const mainDiv = document.getElementById('profiledisplay');
    const profBlock = document.getElementById('profileblock');
    const changeProfileForm = document.getElementById('changeprofform');
    
    if (button.classList.contains('editprofbutclose')) {
        button.classList.remove('editprofbutclose');
        button.className += ' editprofbutopen';
        button.innerHTML = 'Cancel';
        editDiv.style.display = "block";
        mainDiv.style.display = "none";
        profBlock.style.minHeight = '760px';
    }
    
    else {
        button.classList.remove('editprofbutopen');
        button.className += ' editprofbutclose';
        button.innerHTML = 'Edit Profile';
        editDiv.style.display = "none";
        mainDiv.style.display = "block";
        changeProfileForm.reset();
        profBlock.style.minHeight = '370px';
    }
}

function open_header_dropdown_menu() {
  const dropdownMenu = document.getElementById("myDropdown");
  dropdownMenu.classList.toggle("show");
    
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropDowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropDowns.length; i++) {
      var openDropdown = dropDowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function infoOpen() {
	document.getElementById('smallinfopopup').style.display = "block";
	window.scrollTo(0, 0);
}

function feedOpen(feedToBeOpenedButtonID) {
	let feedToBeOpenedButton = document.getElementById(feedToBeOpenedButtonID);
	if (feedToBeOpenedButtonID == 'feed-discover-button') {
		let feedToBeClosedButtonID = 'feed-following-button';
		if (!feedToBeOpenedButton.classList.contains('openfeed')) {
            change_feed_display(feedToBeOpenedButtonID, feedToBeClosedButtonID);
		}
	}

	else {
		let feedToBeClosedButtonID = 'feed-discover-button';
		if (!feedToBeOpenedButton.classList.contains('openfeed')) {
			change_feed_display(feedToBeOpenedButtonID, feedToBeClosedButtonID);
		}
	}
}

function streamOpen(streamTabToBeOpened) {
	const objItem = document.getElementById(streamTabToBeOpened);
	const streamLine = document.getElementById('streamline');
	const notifyLine = document.getElementById('notifyline')
    const streamDiv = document.getElementById('streamdiv');
    const notifyDiv = document.getElementById('notificationdiv');

	if (streamTabToBeOpened == 'streambutton') {
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
    let menu = post.querySelector('.postoptionmenu');
    if (menu.classList.contains('a')) {
        menu.classList.remove('a');
        menu.className += " i";
    }
    else {
        menu.classList.remove('i');
        menu.className += " a";
    }
}

function commentsshow(pid) {
    let post = document.getElementById(pid);
    let div = post.querySelector('.postcommentopen');
    let commentwrite = post.querySelector('.postcommentwrite');
    let commentdiv = post.querySelector('.commentdiv');
    if (commentwrite.classList.contains('a')) {
        commentwrite.classList.remove('a');
        commentwrite.className += ' i';
        commentdiv.innerHTML = "";
    }
    else {
        if (div.classList.contains('a')) {
            div.classList.remove('a');
            div.className += " i";
            commentdiv.innerHTML = "";
        }
        else {
            div.classList.remove('i');
            div.className += " a";
            get_comments(pid);
        }
    }
}

function commentopen(pid) {
    let post = document.getElementById(pid);
    let commentOpen = post.querySelector('.postcommentopen');
    let commentWrite = post.querySelector('.postcommentwrite');
    commentOpen.classList.remove('a');
    commentOpen.className +=" i";
    commentWrite.classList.remove('i');
    commentWrite.className += ' a';
    commentWrite.querySelector('.commentwritetxt').focus();
}

function commentcancel(pid) {
    let post = document.getElementById(pid);
    let commentOpen = post.querySelector('.postcommentopen');
    let commentWrite = post.querySelector('.postcommentwrite');
    commentOpen.classList.remove('i');
    commentOpen.className +=" a";
    commentWrite.classList.remove('a');
    commentWrite.className += ' i';
}

function logout(a) {
    let logoutmenu = document.getElementById('logoutpopup');
    if (a == 'activate') {
        logoutmenu.style.display = 'block';
    }
    else if (a == 'cancel') {
        logoutmenu.style.display = 'none';
    }
    else {
        
    }
}

function repliesshow(cid) {
    commentid = 'c' + cid;
    comment = document.getElementById(commentid);
    let replywrite = comment.querySelector('.replywritediv');
    let replydiv = comment.querySelector('.commentreplydiv');
    if (replydiv.classList.contains('a')) {
        replydiv.classList.remove('a');
        replydiv.className += " i";
        replydiv.querySelector('.replydiv').innerHTML = '';
    }
    else {
        replydiv.classList.remove('i');
        replydiv.className += " a";
        get_replies(cid);
    }
}

function secondreply(rid) {
    replyid = 'r' + rid;
    reply = document.getElementById(replyid);
    let replywrite = reply.querySelector('.secondreplywritediv');
    let replydiv = reply.querySelector('.secondreplydiv');
    if (replydiv.classList.contains('a')) {
        replydiv.classList.remove('a');
        replydiv.className += " i";
    }
    else {
        replydiv.classList.remove('i');
        replydiv.className += " a";
    }
}

function hidereplies(cid) {
    commentid = 'c' + cid;
    comment = document.getElementById(commentid);
    let replydiv = comment.querySelector('.commentreplydiv');
    replydiv.classList.remove('a');
    replydiv.className += " i";
    replydiv.querySelector('.replydiv').innerHTML = '';
    replycancel(cid);
}

function replyopen(cid) {
    commentid = 'c' + cid;
    comment = document.getElementById(commentid);
    let replyopen = comment.querySelector('.replyopendiv');
    let replywrite = comment.querySelector('.replywritediv');
    replyopen.classList.remove('a');
    replyopen.className +=" i";
    replywrite.classList.remove('i');
    replywrite.className += ' a';
    replywrite.querySelector('.replywritetxt').focus();
}

function secondreplyopen(rid,tag) {
    replyid = 'r' + rid;
    reply = document.getElementById(replyid);
    let replyopen = reply.querySelector('.secondreplyopendiv');
    let replywrite = reply.querySelector('.secondreplywritediv');
    let replywritetxt = replywrite.querySelector('.replywritetxt');
    replyopen.classList.remove('a');
    replyopen.className +=" i";
    replywrite.classList.remove('i');
    replywrite.className += ' a';
    let tag_span = '@' + tag;
    end = tag_span.length;
    replywritetxt.value = tag_span;
    replywritetxt.setSelectionRange(end, end);
    replywritetxt.focus();
}

function replycancel(cid) {
    commentid = 'c' + cid;
    comment = document.getElementById(commentid);
    let replyopen = comment.querySelector('.replyopendiv');
    let replywrite = comment.querySelector('.replywritediv');
    replyopen.classList.remove('i');
    replyopen.className +=" a";
    replywrite.classList.remove('a');
    replywrite.className += ' i';
}

function secondreplycancel(rid) {
    replyid = 'r' + rid;
    reply = document.getElementById(replyid);
    let replyopen = reply.querySelector('.secondreplydiv').querySelector('.secondreplyopendiv');
    let replywrite = reply.querySelector('.secondreplydiv').querySelector('.secondreplywritediv');
    replyopen.classList.remove('i');
    replyopen.className +=" a";
    replywrite.classList.remove('a');
    replywrite.className += ' i';
}


function count_chars(countFrom,updateTo) {
    var length = document.getElementById(countFrom).value.length;
    document.getElementById(updateTo).innerHTML = length;
}

function count_chars_comment_write(a) {
    let post = document.getElementById(a);
    let commentwritediv = post.querySelector('.postcommentwrite');
    let length = commentwritediv.querySelector('.commentform').querySelector('.commentwritetxt').value.length;
    commentwritediv.querySelector('.currentlencomment').querySelector('.lenupdatepost').innerHTML = length;
}