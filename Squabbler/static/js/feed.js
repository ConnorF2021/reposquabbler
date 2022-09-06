function comment_submit(pid) {
	commentInputDiv = document.getElementById(pid).querySelector('.postcommentwrite');
	commentInput = commentInputDiv.querySelector('.commentform').querySelector('.commentwritetxt');
	commentInputOpen = document.getElementById(pid).querySelector('.postcommentopen');
    let comment = commentInput.value.trim();
    if (comment.length) {
        socket.emit('handle_comment', {
            comment: comment,
            postid: pid,
        })
        commentInputDiv.classList.remove('a');
        commentInputDiv.className += " i";
        commentInputOpen.classList.remove('i');
        commentInputOpen.className += " a";
        commentInput.value = '';
        let tempBubble = document.createElement('div');
        tempBubble.setAttribute('class','commentbubble');
        tempBubble.innerHTML = `<a href='/${username}'><img src='static/ConnorFulbright.png' class='commentprofimg'></a><h4 class='commentauthor'><a href='/${username}' class='authornamelink fadein hoverpink'>${fullname}</a></h4><p class='commenttag'><a href='/${username}' class='authorlink fadein hoverpink'>@${username}</a> &nbsp; Just Now</p><button class='commentoptionbutton fadein hoverpink'><i class='fa-solid fa-ellipsis fa-lg'></i></button><p class='commentcontent'>${comment}</p><button class='commentreplyopen fadein hoverpink'><i class='fa-solid fa-reply-all fa-lg'></i></button><div class='commentreplydiv i'><div class='replyopendiv' onclick=''><img class='ropenimg' src='static/ConnorFulbright.png'><h5 class='ropentxt'>Reply...</h5></div><button class='hidereplies fadein hoverpink' onclick='hidereplies();''>Hide Replies</button></div>`;
        document.getElementById(pid).querySelector('.commentdiv').prepend(tempBubble);
    }
    return false;
}

function create_post_div(pid,author,authorname,postdate,content,upvotesnumber,downvotesnumber,commentnumber,hasvoted) {
var voteNumber = upvotesnumber + downvotesnumber;
if (voteNumber == 0) {
	votePercent = 0;
}
else {
	var votePercent = 100 * (upvotesnumber / voteNumber);
}
if (hasvoted == 3) {
	var postupvotestatus = 'postupvoteinactive';
	var postdownvotestatus = 'postdownvoteinactive';
}
else if (hasvoted == 1) {
	var postupvotestatus = 'postupvoteactive';
	var postdownvotestatus = 'postdownvoteinactive';
}
else {
	var postupvotestatus = 'postupvoteinactive';
	var postdownvotestatus = 'postdownvoteactive';
} return `
<div class="postbubblediv" id="${pid}">
	<div class="postimgback">
		<a href="/${author}"><img src="static/ConnorFulbright.png" class="postimg"></a>
	</div>
	<button class="postoptionbutton fadein hoverpink" onclick="postmenuopen(${pid});">
		<i class="fa-solid fa-ellipsis fa-lg"></i>
	</button>
	<div class="postoptionmenu i">
		<button class="postoptionmenubutton pomtop fadein"> &nbsp; <i class="fa-solid fa-user-check fa-lg pom-icon-follow"></i> &nbsp; Follow @${author}</button>
		<button class="postoptionmenubutton pommid fadein"> &nbsp; <i class="fa-solid fa-ban fa-lg pom-icon-block"></i> &nbsp; Block @${author}</button>
		<button class="postoptionmenubutton pombot fadein"> &nbsp; <i class="fa-solid fa-flag fa-lg pom-icon-report"></i> &nbsp; Report @${author}</button>
	</div>
	<h4 class="postauthorname">
		<a href="/${author}" class="authornamelink fadein hoverpink">${authorname}</a>
	</h4>
	<h5 class="postauthor">
		<a href="/${author}" class="authorlink fadein hoverpink">@${author}</a> &nbsp; ${postdate}
	</h5>
	<div class="postcontentdiv">
		<p class="postcontent">${content}</p>
	</div>
	<div class="postmenu">
		<div class="postvotediv">
			<p class="postvotebarstatus">${votePercent}% Approval / ${voteNumber} Votes</p>
			<div class="postvotebarback">
				<div class="postvotebar" style="width: ${votePercent}%"></div>
			</div>
		</div>
		<button class="postupvote ${postupvotestatus} postmenubuttons fadein hovergreen" onclick="postupvote(${pid});">
			<i class="fa-solid fa-arrow-trend-up fa-lg"></i> <span class="upvotes-number-span">${upvotesnumber}</span>
		</button>
		<button class="postdownvote ${postdownvotestatus} postmenubuttons fadein hoverred" onclick="postdownvote(${pid});">
			<i class="fa-solid fa-arrow-trend-down fa-lg"></i> <span class="downvotes-number-span">${downvotesnumber}</span>
		</button>
		<button class="postcomment postmenubuttons fadein hoverpink" onclick="commentsshow(${pid})">
			<i class="fa-solid fa-comment fa-lg"></i> ${commentnumber}
		</button>
		<button class="postshare postmenubuttons fadein hoverpink">
			<i class="fa-solid fa-share fa-lg"></i>
		</button>
	</div>
	<div class="postcommentopen i" onclick="commentopen(${pid});">
		<img class="copenimg" src="static/ConnorFulbright.png">
		<h4 class="copentxt">Engage with post...</h4>
	</div>
	<div class="postcommentwrite i">
		<img class="commentwriteimg" src="static/ConnorFulbright.png">
		<form class="commentform" name="commentform">
			<textarea name="commentinput" class="commentwritetxt" type="text" placeholder="Type here..." maxlength="1000" onkeyup="count_chars_comment_write(${pid});" onkeydown="count_chars_comment_write(${pid});"></textarea>
				<input class="commentsubmit fadein" type="submit" value="Post" onclick="return comment_submit(${pid});">
		</form>
		<p class="noselect currentlencomment"><span class="lenupdatepost">0</span>/1000</p>
		<button class="commentcancel" onclick="commentcancel(${pid});">Cancel</button>
	</div>
	<div class="commentdiv">
	</div>
</div>
<div class="placeholder-div-insert"></div>
`
}

function get_comments(pid) {
	let spinner = document.createElement('div');
	spinner.setAttribute('class', 'loader');
	document.getElementById(pid).querySelector('.commentdiv').appendChild(spinner);
	socket.emit('get_comments', {
		postid: pid
	})
}

function create_empty_post_bubble(content,pid,author,tag,postdate) {
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

socket.on('recieve_comments', function (a) {
	var comments = JSON.parse(a);
    for (var i in comments) {
    	if (comments[i].commentid == 0) {
    		let tempBubble = document.createElement('div');
    		tempBubble.setAttribute('class','commentbubble');
    		tempBubble.innerHTML = create_empty_post_bubble(comments[i].content, comments[i].pid, comments[i].author, comments[i].tag, comments[i].postdate);
	    	document.getElementById(comments[i].postid).querySelector('.commentdiv').appendChild(tempBubble);
	    	if (document.getElementById(comments[i].postid).querySelector('.commentdiv').querySelector('.loader') !== null) {
	    		document.getElementById(comments[i].postid).querySelector('.commentdiv').querySelector('.loader').remove();
	    	}
    	}
    	else {
	    	let commentId = comments[i].commentid;
	    	var commentIdActual = 'c' + commentId.toString();
	    	let newNode = document.createElement('div');
	    	newNode.setAttribute('class','commentbubble');
	    	newNode.setAttribute('id', commentIdActual);
	    	newNode.innerHTML = `
	    						<a href="/${comments[i].tag}">
	    							<img src="static/ConnorFulbright.png" class="commentprofimg">
	    						</a>
	    						<h4 class="commentauthor">
	    							<a href="/${comments[i].tag}" class="authornamelink fadein hoverpink">${comments[i].author}</a>
	    						</h4>
	    						<p class="commenttag">
	    							<a href="/${comments[i].tag}" class="authorlink fadein hoverpink">@${comments[i].tag}</a> &nbsp; ${comments[i].postdate}
	    						</p>
	    						<button class="commentoptionbutton fadein hoverpink">
	    							<i class="fa-solid fa-ellipsis fa-lg"></i>
	    						</button>
	    						<p class="commentcontent">${comments[i].content}</p>
	    						<div class="commentmenu">
	        						<div class="postcommentvotemenu">
	            						<div class="commentvotediv">
											<p class="commentvotebarstatus">50% Approval / 1 Votes</p>
											<div class="commentvotebarback">
												<div class="commentvotebar" style="width: 50%"></div>
											</div>
										</div>
										<button class="postcommentvotebutton postcommentupvote fadein hovergreen" onclick="">
	            							<i class="fa-solid fa-arrow-trend-up fa-lg"></i>
	            						</button>
	            						<button class="postcommentvotebutton postcommentdownvote fadein hoverred" onclick="">
	            							<i class="fa-solid fa-arrow-trend-down fa-lg"></i>
	            						</button>
	        						</div>
	        						<button class="commentreplyopen fadein hoverpink" onclick="repliesshow(${commentId});">
	        							Reply / Replies (${comments[i].replynumber})
	        						</button>
	        					</div>
	    						<div class="commentreplydiv i">
	    							<div class="replyopendiv a" onclick="replyopen(${commentId});">
	    								<img class="ropenimg" src="static/ConnorFulbright.png">
										<h5 class="ropentxt">Reply to ${comments[i].author}...</h5>
									</div>
									<div class="replywritediv i">
										<img class="replywriteimg" src="static/ConnorFulbright.png">
										<form class="replyform" name="replyform">
											<textarea name="replyinput" class="replywritetxt" type="text" placeholder="Type here..." maxlength="1000"></textarea>
											<input class="replysubmit" type="submit" value="Post" onclick="return reply_submit(${comments[i].commentid});">
										</form>
										<button class="replycancel" onclick="replycancel(${commentId});">Cancel</button>
									</div>
									<div class="replydiv"></div>
									<button class="hidereplies fadein hoverpink" onclick="hidereplies(${commentId});">Hide Replies</button>
								</div>
	    						`;
	    	document.getElementById(comments[i].postid).querySelector('.commentdiv').appendChild(newNode);
	    	if (document.getElementById(comments[i].postid).querySelector('.commentdiv').querySelector('.loader') !== null) {
	    		document.getElementById(comments[i].postid).querySelector('.commentdiv').querySelector('.loader').remove();
	    	}
	    }
    }
});

function reply_submit(cid) {
	commentid = 'c' + cid;
	comment = document.getElementById(commentid)
	replyinputdiv = comment.querySelector('.replywritediv');
	replyinput = replyinputdiv.querySelector('.replyform').querySelector('.replywritetxt');
	replyinputopen = comment.querySelector('.replyopendiv');
    let reply = replyinput.value.trim();
    if (reply.length) {
        socket.emit('handle_reply', {
            reply: reply,
            commentid: cid,
        })
        replyinputdiv.classList.remove('a');
        replyinputdiv.className += " i";
        replyinputopen.classList.remove('i');
        replyinputopen.className += " a";
        replyinput.value = '';
        let tempbubble = document.createElement('div');
        tempbubble.setAttribute('class','replybubble');
        tempbubble.innerHTML = `<a href='/profile'><img src='static/ConnorFulbright.png' class='replyprofimg'></a><h4 class='replyauthor fadein hoverpink'>${fullname}</h4><p class='replytag'><a href='/profile' class='authorlink fadein hoverpink'>@${username}</a> &nbsp; Just Now</p><button class='replyoptionbutton fadein hoverpink'><i class='fa-solid fa-ellipsis fa-lg'></i></button><p class='replycontent'>${reply}</p><button class='postcomment commentreplyopen fadein hoverpink' onclick=''><i class='fa-solid fa-reply-all fa-lg'></i></button>`;
        	document.getElementById(commentid).querySelector('.commentreplydiv').querySelector('.replydiv').prepend(tempbubble);
    }
    return false;
}
function get_replies(cid) {
	socket.emit('get_replies', {
		commentid: cid
	})
}
socket.on('recieve_replies', function (a) {
	var replies = JSON.parse(a);
	for (var i in replies) {
		let replyid = replies[i].replyid;
    	var replyidactual = 'r' + replies[i].replyid;
    	var commentidactual = 'c' + replies[i].commentid;
    	let newReply = document.createElement('div');
    	newReply.setAttribute('class','replybubble');
    	newReply.setAttribute('id', replyidactual);
    	newReply.innerHTML = `
    						<a href="/${replies[i].tag}">
    							<img src="static/ConnorFulbright.png" class="replyprofimg">
    						</a>
    						<a href="/${replies[i].tag}">
    							<h4 class="replyauthor fadein hoverpink">${replies[i].author}</h4>
    						</a>
    						<p class="replytag">
    							<a href="/${replies[i].tag}" class="authorlink fadein hoverpink">@${replies[i].tag}</a> &nbsp; ${replies[i].replydate}
    						</p>
    						<button class="replyoptionbutton fadein hoverpink">
    							<i class="fa-solid fa-ellipsis fa-lg"></i>
    						</button>
    						<p class="replycontent">${replies[i].content}</p>
    						<button class="postcomment secondcommentreplyopen fadein hoverpink" onclick="secondreply(${replyid});">
    							Reply
    						</button>
    						<div class="secondreplydiv i">
    							<div class="secondreplyopendiv a" onclick="secondreplyopen(${replyid},'${replies[i].tag}');">
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
    	document.getElementById(commentidactual).querySelector('.commentreplydiv').querySelector('.replydiv').appendChild(newReply);
	}
})

function second_reply_submit(commentid) {

}

function postupvote(postid) {
	socket.emit('post_upvote', {
		postid: postid
	});
	local_post_upvote_update(postid);
}

function local_post_upvote_update(postid) {
	let postupvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postupvote');
	let postdownvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postdownvote');
	if (postupvote.classList.contains('postupvoteinactive')) {
		postupvote.classList.remove('postupvoteinactive');
		postupvote.className += ' postupvoteactive';
		if (postdownvote.classList.contains('postdownvoteactive')) {
			postdownvote.classList.remove('postdownvoteactive');
			postdownvote.className += ' postdownvoteinactive';
			let newDownVotesNumber = parseInt(postdownvote.querySelector('.downvotes-number-span').innerHTML) - 1;
			let newUpVotesNumber = parseInt(postupvote.querySelector('.upvotes-number-span').innerHTML) + 1;
			postdownvote.querySelector('.downvotes-number-span').innerHTML = newDownVotesNumber;
			postupvote.querySelector('.upvotes-number-span').innerHTML = newUpVotesNumber;

		}
		else if (postupvote.classList.contains('postupvoteactive')) {

		}
		else {
			let newUpVotesNumber = parseInt(postupvote.querySelector('.upvotes-number-span').innerHTML) + 1;
			postupvote.querySelector('.upvotes-number-span').innerHTML = newUpVotesNumber;
		}
	}
}

function postdownvote(postid) {
	socket.emit('post_downvote', {
		postid: postid
	});
	local_post_downvote_update(postid);
}

function local_post_downvote_update(postid) {
	let postupvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postupvote');
	let postdownvote = document.getElementById(postid).querySelector('.postmenu').querySelector('.postdownvote');
	if (postdownvote.classList.contains('postdownvoteinactive')) {
		postdownvote.classList.remove('postdownvoteinactive');
		postdownvote.className += ' postdownvoteactive';
		if (postupvote.classList.contains('postupvoteactive')) {
			postupvote.classList.remove('postupvoteactive');
			postupvote.className += ' postupvoteinactive';
			let newUpVotesNumber = parseInt(postupvote.querySelector('.upvotes-number-span').innerHTML) - 1;
			let newDownVotesNumber = parseInt(postdownvote.querySelector('.downvotes-number-span').innerHTML) + 1;
			postupvote.querySelector('.upvotes-number-span').innerHTML = newUpVotesNumber;
			postdownvote.querySelector('.downvotes-number-span').innerHTML = newDownVotesNumber;
		}
		else if (postdownvote.classList.contains('postdownvoteactive')) {
			
		}
		else {
			let newDownVotesNumber = parseInt(postdownvote.querySelector('.downvotes-number-span').innerHTML) + 1;
			postdownvote.querySelector('.downvotes-number-span').innerHTML = newDownVotesNumber;
		}
	}
}

function post_submit() {
	let posttext = document.getElementById('posttextsquab');
	let content = posttext.value;
	var activeFeed = document.getElementById('wrapperfeeddiv').querySelector('.activefeed');
	if (content.length > 0) {
		if (content.length <= 1000) {
			socket.emit('handle_post', {
				content: content
			});
		}
		var firstFeedBubble = activeFeed.querySelector('.first-feed-bubble');
		let existingPostDiv = firstFeedBubble.querySelector('.postbubblediv');
		newExistingBubble = document.createElement('div');
		newExistingBubble.setAttribute('class','feedbubble');
		newExistingBubble.append(existingPostDiv);
		document.getElementById('wrapperfeeddiv').querySelector('.activefeed').insertBefore(newExistingBubble, firstFeedBubble.nextSibling);
		let newPost = document.createElement('div');
        newPost.setAttribute('class','postbubbleouterdiv');
        newPost.innerHTML = create_post_div(3,username,fullname,'Just Now',content,0,0,0,3);
        var firstFeedLine = firstFeedBubble.querySelector('.firstfeedline');
        firstFeedBubble.insertBefore(newPost, firstFeedLine.nextSibling);
	}

    posttext.value = '';
	return false;
}