// All functions created for the purpose of encapsulation reside here.

// Client Side Stream Display



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

function create_empty_comment_bubble(content,pid,author,tag,postdate) { //encapsulation function
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

// Client-Side Post Voting Update

function local_post_upvote_update(postid) { //encapsulation function
	if (!post_upvote_is_active(postid)) {
		post_upvote_activate(postid);
		if (post_downvote_is_active(postid)) {
			post_downvote_deactivate(postid);
			add_one_upvote(postid);
			subtract_one_downvote(postid)
		}
		else {
			add_one_upvote(postid);
		}
	}
} 

function local_post_downvote_update(postid) { //encapsulation function
	if (!post_downvote_is_active(postid)) {
		post_downvote_activate(postid);
		if (post_upvote_is_active(postid)) {
			post_upvote_deactivate(postid);
			subtract_one_upvote(postid);
			add_one_downvote(postid);
		}
		else {
			add_one_downvote(postid);
		}
	}
}

function add_one_upvote(postid) { //encapsulation function
	let postupvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postupvote');
	let newUpVotesNumber = parseInt(postupvote.querySelector('.upvotes-number-span').innerHTML) + 1;
	postupvote.querySelector('.upvotes-number-span').innerHTML = newUpVotesNumber;
}

function add_one_downvote(postid) { //encapsulation function
	let postdownvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postdownvote');
	let newDownVotesNumber = parseInt(postdownvote.querySelector('.downvotes-number-span').innerHTML) + 1;
	postdownvote.querySelector('.downvotes-number-span').innerHTML = newDownVotesNumber;
}

function subtract_one_upvote(postid) { //encapsulation function
	let postupvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postupvote');
	let newUpVotesNumber = parseInt(postupvote.querySelector('.upvotes-number-span').innerHTML) - 1;
	postupvote.querySelector('.upvotes-number-span').innerHTML = newUpVotesNumber;
}

function subtract_one_downvote(postid) { //encapsulation function
	let postdownvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postdownvote');
	let newDownVotesNumber = parseInt(postdownvote.querySelector('.downvotes-number-span').innerHTML) - 1;
	postdownvote.querySelector('.downvotes-number-span').innerHTML = newDownVotesNumber;
}

function post_upvote_activate(postid) { //encapsulation function
	let postupvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postupvote');
	postupvote.classList.remove('postupvoteinactive');
	postupvote.className += ' postupvoteactive';
}

function post_downvote_activate(postid) { //encapsulation function
	let postdownvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postdownvote');
	postdownvote.classList.remove('postdownvoteinactive');
	postdownvote.className += ' postdownvoteactive';
}

function post_upvote_deactivate(postid) { //encapsulation function
	let postupvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postupvote');
	postupvote.classList.remove('postupvoteactive');
	postupvote.className += ' postupvoteinactive';
}

function post_downvote_deactivate(postid) { //encapsulation function
	let postdownvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postdownvote');
	postdownvote.classList.remove('postdownvoteactive');
	postdownvote.className += ' postdownvoteinactive';
}

function post_upvote_is_active(postid) { //encapsulation function
	let postupvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postupvote');
	if (postupvote.classList.contains('postupvoteactive')) { 
		return true;
	}
	else {
		return false;
	}
}

function post_downvote_is_active(postid) { //encapsulation function
	let postdownvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postdownvote');
	if (postdownvote.classList.contains('postdownvoteactive')) { 
		return true;
	}
	else {
		return false;
	}
}

// End Client-Side Post Voting Update