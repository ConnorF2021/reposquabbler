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