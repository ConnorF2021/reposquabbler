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
      const dropDowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropDowns.length; i++) {
        const openDropdown = dropDowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

function info_open() {
	document.getElementById('smallinfopopup').style.display = "block";
	window.scrollTo(0, 0);
}

function feed_open(feedToBeOpenedButtonID) {
	if (feedToBeOpenedButtonID == 'feed-discover-button') {
		let feedToBeClosedButtonID = 'feed-following-button';
        change_feed_display(feedToBeOpenedButtonID, feedToBeClosedButtonID);
	}
	else {
		let feedToBeClosedButtonID = 'feed-discover-button';
		change_feed_display(feedToBeOpenedButtonID, feedToBeClosedButtonID);
	}
}

function stream_open(streamTabToBeOpenedID) {
	if (streamTabToBeOpenedID == 'streambutton') {
		let otherItem = 'notificationbutton';
		change_active_stream_button(streamTabToBeOpenedID, otherItem);
        change_stream_div_to("stream-div");
        change_stream_line_to("stream-line");
	}
	else {
		let otherItem = 'streambutton';
        change_active_stream_button(streamTabToBeOpenedID, otherItem);
        change_stream_div_to("notify-div");
        change_stream_line_to("notify-line");
	}
}

function change_stream_display() { //encapsulation function

}

function close_small_info() {
	document.getElementById('smallinfopopup').style.display = 'none';
}

function expand_stream(curbtn) {
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

function menu_open(objValue) {
    const objItem = document.getElementById(objValue);
    const discoverDiv = document.getElementById('solomenudiv');
    const followingDiv = document.getElementById('multimenudiv')
    
    if (objValue === 'solomenubutton') {
      const otherItem = document.getElementById('multimenubutton');
      if (!objItem.classList.contains('openfeed')) {
        objItem.classList.add('openfeed');
        objItem.classList.remove('closedfeed');
        otherItem.classList.add('closedfeed');
        otherItem.classList.remove('openfeed');
        discoverDiv.classList.remove('inactivefeed');
        discoverDiv.classList.add('activefeed');
        followingDiv.classList.remove('activefeed');
        followingDiv.classList.add('inactivefeed');
      }
    } else {
      const otherItem = document.getElementById('solomenubutton');
      if (!objItem.classList.contains('openfeed')) {
        objItem.classList.add('openfeed');
        objItem.classList.remove('closedfeed');
        otherItem.classList.add('closedfeed');
        otherItem.classList.remove('openfeed');
        followingDiv.classList.remove('inactivefeed');
        followingDiv.classList.add('activefeed');
        discoverDiv.classList.remove('activefeed');
        discoverDiv.classList.add('inactivefeed');
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

function success_close() {
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

function postmenuopen(postID) {
    let post = document.getElementById(postID);
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

function show_comments(postID) {
    const post = document.getElementById(postID);
    const div = post.querySelector('.postcommentopen');
    const commentwrite = post.querySelector('.postcommentwrite');
    const commentdiv = post.querySelector('.commentdiv');
    
    if (commentwrite.classList.contains('a')) {
      commentwrite.classList.remove('a');
      commentwrite.classList.add('i');
      commentdiv.innerHTML = '';
    } else {
      if (div.classList.contains('a')) {
        div.classList.remove('a');
        div.classList.add('i');
        commentdiv.innerHTML = '';
      } else {
        div.classList.remove('i');
        div.classList.add('a');
        get_comments(postID);
      }
    }
  }

function get_comments(postID) {
	let spinner = document.createElement('div');
	spinner.setAttribute('class', 'loader');
	document.getElementById(postID).querySelector('.commentdiv').appendChild(spinner);
	socket.emit('get_comments', {
		postid: postID
	})
}

function open_comment_write_div(postID) {
    let post = document.getElementById(postID);
    let commentOpen = post.querySelector('.postcommentopen');
    let commentWrite = post.querySelector('.postcommentwrite');
    commentOpen.classList.remove('a');
    commentOpen.className +=" i";
    commentWrite.classList.remove('i');
    commentWrite.className += ' a';
    commentWrite.querySelector('.commentwritetxt').focus();
}

function close_comment_write_div(postID) {
    let post = document.getElementById(postID);
    let commentOpen = post.querySelector('.postcommentopen');
    let commentWrite = post.querySelector('.postcommentwrite');
    commentOpen.classList.remove('i');
    commentOpen.className +=" a";
    commentWrite.classList.remove('a');
    commentWrite.className += ' i';
}

function logout(buttonSelected) {
    const logoutmenu = document.getElementById('logoutpopup');
    if (buttonSelected == 'activate') {
      logoutmenu.style.display = 'block';
    } else if (buttonSelected == 'cancel') {
      logoutmenu.style.display = 'none';
    }
  }

  function show_replies(commentID) {
    const commentIDActual = 'c' + commentID;
    const comment = document.getElementById(commentIDActual);
    const replywrite = comment.querySelector('.replywritediv');
    const replydiv = comment.querySelector('.commentreplydiv');
    
    if (replydiv.classList.contains('a')) {
      replydiv.classList.remove('a');
      replydiv.classList.add('i');
      replydiv.querySelector('.replydiv').innerHTML = '';
    } else {
      replydiv.classList.remove('i');
      replydiv.classList.add('a');
      get_replies(commentID);
    }
  }

function reply_div_open(commentID) {
    commentIDActual = 'c' + commentID;
    comment = document.getElementById(commentIDActual);
    let replyopen = comment.querySelector('.replyopendiv');
    let replywrite = comment.querySelector('.replywritediv');
    replyopen.classList.remove('a');
    replyopen.className +=" i";
    replywrite.classList.remove('i');
    replywrite.className += ' a';
    replywrite.querySelector('.replywritetxt').focus();
}

function second_reply_div_open(replyID) {
    const replyIDActual = 'r' + replyID;
    const reply = document.getElementById(replyIDActual);
    const replydiv = reply.querySelector('.secondreplydiv');
    
    if (replydiv.classList.contains('a')) {
      replydiv.classList.remove('a');
      replydiv.classList.add('i');
    } else {
      replydiv.classList.remove('i');
      replydiv.classList.add('a');
    }
  }

function hidereplies(commentID) {
    commentIDActual = 'c' + commentID;
    comment = document.getElementById(commentIDActual);
    let replydiv = comment.querySelector('.commentreplydiv');
    replydiv.classList.remove('a');
    replydiv.className += " i";
    replydiv.querySelector('.replydiv').innerHTML = '';
    replycancel(commentID);
}


function replycancel(commentID) {
    commentIDActual = 'c' + commentID;
    comment = document.getElementById(commentIDActual);
    let replyopen = comment.querySelector('.replyopendiv');
    let replywrite = comment.querySelector('.replywritediv');
    replyopen.classList.remove('i');
    replyopen.className +=" a";
    replywrite.classList.remove('a');
    replywrite.className += ' i';
}

function second_reply_write_open(replyID, tag) {
    const replyIDActual = 'r' + replyID;
    const reply = document.getElementById(replyIDActual);
    const replyWrite = reply.querySelector('.secondreplywritediv');
    const replyWritetxt = replyWrite.querySelector('.replywritetxt');
    
    if (replyWrite.classList.contains('i')) {
      replyWrite.classList.remove('i');
      replyWrite.classList.add('a');
    } else {
      replyWrite.classList.remove('a');
      replyWrite.classList.add('i');
      replyWritetxt.value = '';
    }
    const tagSpan = '@' + tag + ' ';
    const end = tagSpan.length;
    replyWritetxt.value = tagSpan;
    replyWritetxt.setSelectionRange(end, end);
    replyWritetxt.focus();
  }

function secondreplycancel(replyID) {
    replyIDActual = 'r' + replyID;
    reply = document.getElementById(replyIDActual);
    let replywrite = reply.querySelector('.secondreplywritediv');
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