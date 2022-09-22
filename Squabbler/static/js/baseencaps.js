// All functions created for the purpose of encapsulation reside here.

// Client Side Stream Display

function change_active_stream_button(buttonBecomingActive, buttonBecomingInactive) { //encapsulation function
    const objItem = document.getElementById(buttonBecomingActive);
    const otherItem = document.getElementById(buttonBecomingInactive);
    objItem.className += " openstream";
	objItem.classList.remove('closedstream');
	otherItem.className += " closedstream"
	otherItem.classList.remove('openstream');
}

function change_stream_div_to(divBecomingActive) { //encapsulation function
    const streamDiv = document.getElementById('streamdiv');
    const notifyDiv = document.getElementById('notificationdiv');

    if (divBecomingActive == 'stream-div') {
        streamDiv.classList.remove('inactiveside');
        streamDiv.className += " activeside";
        notifyDiv.classList.remove('activeside');
        notifyDiv.className += " inactiveside";
    }

    else {
        notifyDiv.classList.remove('inactiveside');
        notifyDiv.className += " activeside";
        streamDiv.classList.remove('activeside');
        streamDiv.className += " inactiveside";
    }
}

function change_stream_line_to(lineBecomingActive) { //encapsulation function
    const streamLine = document.getElementById('streamline');
	const notifyLine = document.getElementById('notifyline');

    if (lineBecomingActive == "stream-line") {
        streamLine.style.backgroundColor = "palevioletred";
		streamLine.style.height = "1.5px";
		streamLine.style.top = "44.5px";
        notifyLine.style.backgroundColor = "lightgray";
		notifyLine.style.height = "0.5px";
		notifyLine.style.top = "46px";
    }

    else {
        notifyLine.style.backgroundColor = "palevioletred";
		notifyLine.style.height = "1.5px";
		notifyLine.style.top = "44.5px";
        streamLine.style.backgroundColor = "lightgray";
		streamLine.style.height = "0.5px";
		streamLine.style.top = "46px";
    }
}

// End Client Side Stream Display

// Client Side Feed Display

function change_feed_display(FeedButtonToBeActivatedID,FeedButtonToBeDeactivatedID) { //encapsulation function
    switch_active_feed_button(FeedButtonToBeActivatedID,FeedButtonToBeDeactivatedID);
    if (FeedButtonToBeActivatedID === 'feed-following-button') {
        activate_feed('following');
        deactivate_feed('discover');
    }
    else {
        activate_feed('discover');
        deactivate_feed('following');
    }
}

function switch_active_feed_button(FeedButtonToBeActivatedID,FeedButtonToBeDeactivatedID) {
	FeedButtonToBeActivated = document.getElementById(FeedButtonToBeActivatedID);
    FeedButtonToBeDeactivated = document.getElementById(FeedButtonToBeDeactivatedID);
	FeedButtonToBeActivated.className += " openfeed";
    FeedButtonToBeActivated.classList.remove('closedfeed');
    FeedButtonToBeDeactivated.className += " closedfeed"
    FeedButtonToBeDeactivated.classList.remove('openfeed');
}

function activate_feed(feedType) { //encapsulation function
    const discoverDiv = document.getElementById('discoverfeeddiv');
    const followingDiv = document.getElementById('followingfeeddiv');
    if (feedType == 'discover') {
        discoverDiv.classList.remove('inactivefeed');
        discoverDiv.className += " activefeed";
    }
    else {
        followingDiv.classList.remove('inactivefeed');
        followingDiv.className += " activefeed";
    }
}

function deactivate_feed(feedType) { //encapsulation function
    const discoverDiv = document.getElementById('discoverfeeddiv');
    const followingDiv = document.getElementById('followingfeeddiv');
    if (feedType == 'discover') {
        discoverDiv.classList.remove('activefeed');
        discoverDiv.className += " inactivefeed";
    }
    else {
        followingDiv.classList.remove('activefeed');
        followingDiv.className += " inactivefeed";
    }
}

// End Client Side Feed Display

// Client Side Comment Functions

function create_empty_comment_bubble(content,postID,author,tag,postdate) { //encapsulation function
	return `
		<a href="/${tag}">
			<img src="static/ConnorFulbright.png" class="commentprofimg">
		</a>
		<h4 class="commentauthor">
			<a href="/${tag}" class="authornamelink fadein hoverpink">${author}</a>
		</h4>
		<p class="commenttag">
			<a href="/${tag}" class="authorlink fadein hoverpink">@${tag}</a> &nbsp; ${postdate}
		</p>
		<p class="commentcontent">${content}</p>
		`;
}

// End Client Side Comment Functions

// Client-Side Reply Functions

function create_reply_div(tag, author, content, replyid, replydate, commentidactual) { //encaps function
	return `
	<a href="/${tag}">
		<img src="static/ConnorFulbright.png" class="replyprofimg">
	</a>
	<a href="/${tag}">
		<h4 class="replyauthor fadein hoverpink">${author}</h4>
	</a>
	<p class="replytag">
		<a href="/${tag}" class="authorlink fadein hoverpink">@${tag}</a> &nbsp; ${replydate}
	</p>
	<button class="replyoptionbutton fadein hoverpink">
		<i class="fa-solid fa-ellipsis fa-lg"></i>
	</button>
	<p class="replycontent">${content}</p>
	<button class="postcomment secondcommentreplyopen fadein hoverpink" onclick="second_reply_div_open(${replyid});">
		Reply
	</button>
	<div class="secondreplydiv i">
		<div class="secondreplyopendiv a" onclick="second_reply_write_open(${replyid},'${tag}');">
			<img class="sropenimg" src="static/ConnorFulbright.png">
			<h5 class="sropentxt">Reply...</h5>
		</div>
		<div class="secondreplywritediv i">
			<img class="replywriteimg" src="static/ConnorFulbright.png">
			<form class="replyform" name="replyform">
				<textarea name="replyinput" class="replywritetxt" maxlength="1000"></textarea>
				<input class="replysubmit" type="submit" value="Post" onclick="return reply_submit(${commentidactual});">
			</form>
			<button class="replycancel" onclick="secondreplycancel(${replyid});">Cancel</button>
		</div>
	</div>
	`;
}

// End Client-Side Reply Functions

// Client-Side Post Voting Update

function local_post_upvote_update(postID) { //encapsulation function
	if (!post_upvote_is_active(postID)) {
		post_upvote_activate(postID);
		if (post_downvote_is_active(postID)) {
			post_downvote_deactivate(postID);
			add_one_upvote(postID);
			subtract_one_downvote(postID);
			update_total_votes_and_bar(postID);
		}
		else {
			add_one_upvote(postID);
			update_total_votes_and_bar(postID);
		}
	}
} 

function local_post_downvote_update(postID) { //encapsulation function
	if (!post_downvote_is_active(postID)) {
		post_downvote_activate(postID);
		if (post_upvote_is_active(postID)) {
			post_upvote_deactivate(postID);
			subtract_one_upvote(postID);
			add_one_downvote(postID);
			update_total_votes_and_bar(postID);
		}
		else {
			add_one_downvote(postID);
			update_total_votes_and_bar(postID);
		}
	}
}

function update_total_votes_and_bar(postID) {
	let postMenu = document.getElementById(postID).querySelector('.postmenu');
	let postBar = postMenu.querySelector('.postvotediv').querySelector('.postvotebarback').querySelector('.postvotebar');
	let postupvote = postMenu.querySelector('.postupvote');
	let postdownvote = postMenu.querySelector('.postdownvote');
	let postStatusInfo = postMenu.querySelector('.postvotediv').querySelector('.postvotebarstatus');
	let upVotesNumber = parseInt(postupvote.querySelector('.upvotes-number-span').innerHTML);
	let downVotesNumber = parseInt(postdownvote.querySelector('.downvotes-number-span').innerHTML);

	let totalVotes = upVotesNumber + downVotesNumber;
	let approvalPercent = (upVotesNumber / totalVotes) * 100;
	postStatusInfo.innerHTML = `${approvalPercent}% Approval / ${totalVotes} Votes`;
	postBar.style.width = approvalPercent + '%';
}

function add_one_upvote(postID) { //encapsulation function
	let postupvote = document.getElementById(postID).querySelector('.postmenu').querySelector('.postupvote');
	let newUpVotesNumber = parseInt(postupvote.querySelector('.upvotes-number-span').innerHTML) + 1;
	postupvote.querySelector('.upvotes-number-span').innerHTML = newUpVotesNumber;
}

function add_one_downvote(postID) { //encapsulation function
	let postdownvote = document.getElementById(postID).querySelector('.postmenu').querySelector('.postdownvote');
	let newDownVotesNumber = parseInt(postdownvote.querySelector('.downvotes-number-span').innerHTML) + 1;
	postdownvote.querySelector('.downvotes-number-span').innerHTML = newDownVotesNumber;
}

function subtract_one_upvote(postID) { //encapsulation function
	let postupvote = document.getElementById(postID).querySelector('.postmenu').querySelector('.postupvote');
	let newUpVotesNumber = parseInt(postupvote.querySelector('.upvotes-number-span').innerHTML) - 1;
	postupvote.querySelector('.upvotes-number-span').innerHTML = newUpVotesNumber;
}

function subtract_one_downvote(postID) { //encapsulation function
	let postdownvote = document.getElementById(postID).querySelector('.postmenu').querySelector('.postdownvote');
	let newDownVotesNumber = parseInt(postdownvote.querySelector('.downvotes-number-span').innerHTML) - 1;
	postdownvote.querySelector('.downvotes-number-span').innerHTML = newDownVotesNumber;
}

function post_upvote_activate(postID) { //encapsulation function
	let postupvote = document.getElementById(postID).querySelector('.postmenu').querySelector('.postupvote');
	postupvote.classList.remove('postupvoteinactive');
	postupvote.className += ' postupvoteactive';
}

function post_downvote_activate(postID) { //encapsulation function
	let postdownvote = document.getElementById(postID).querySelector('.postmenu').querySelector('.postdownvote');
	postdownvote.classList.remove('postdownvoteinactive');
	postdownvote.className += ' postdownvoteactive';
}

function post_upvote_deactivate(postID) { //encapsulation function
	let postupvote = document.getElementById(postID).querySelector('.postmenu').querySelector('.postupvote');
	postupvote.classList.remove('postupvoteactive');
	postupvote.className += ' postupvoteinactive';
}

function post_downvote_deactivate(postID) { //encapsulation function
	let postdownvote = document.getElementById(postID).querySelector('.postmenu').querySelector('.postdownvote');
	postdownvote.classList.remove('postdownvoteactive');
	postdownvote.className += ' postdownvoteinactive';
}

function post_upvote_is_active(postID) { //encapsulation function
	let postupvote = document.getElementById(postID).querySelector('.postmenu').querySelector('.postupvote');
	if (postupvote.classList.contains('postupvoteactive')) { 
		return true;
	}
	else {
		return false;
	}
}

function post_downvote_is_active(postID) { //encapsulation function
	let postdownvote = document.getElementById(postID).querySelector('.postmenu').querySelector('.postdownvote');
	if (postdownvote.classList.contains('postdownvoteactive')) { 
		return true;
	}
	else {
		return false;
	}
}

// End Client-Side Post Voting Update