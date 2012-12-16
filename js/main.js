function parseRSS(url, callback) {
	$.ajax({
		url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
		dataType: 'json',
		success: function(data) {
		  callback(data.responseData.feed);
		}
	  });
	}
	function loadNews() {
		var url = 'http://globoesporte.globo.com/servico/semantica/editorias/plantao/futebol/times/corinthians/feed.rss';
		parseRSS(url, function(data){
			addParagraphs(data.link, data.entries, '.news');
		});
	}
	function loadTwitter() {
		$.getJSON('http://search.twitter.com/search.json?q=%23vaicorinthians&page=1&rpp=8&include_entities=true&callback=?', 
			function(data) { 
				$.each(data.results, function(index, value) { 
					$('<p><a target="_blank" href="http://twitter.com/'+value.from_user+'" title="'+value.from_user_name+'"">@'+value.from_user+'</a> '+value.text+'</p><hr/>').appendTo('.twitter');
				});
			}
		);
	}
	function loadBlogs() {
		var urls = [
			'http://globoesporte.globo.com/platb/sp-torcedor-corinthians/feed/', 
			'http://globoesporte.globo.com/futebol/diario-de-um-samurai/platb/',
			'http://loucoporticorinthians.com.br/profiles/blog/feed?xn_auth=no',
			'http://ocorinthians.blogspot.com/feeds/posts/default',
			'http://timaoblogfiel.blogspot.com/feeds/posts/default'
		];
		$.each(urls, function(index, url) { 
			parseRSS(url, function(data){
				addParagraphs(data.link, data.entries.slice(0,2), '.blogs');
			});
		});
	}
	function addParagraphs(source, entries, mainCssClass) {
		$.each(entries, function(index, entry) { 
			if (entry.contentSnippet.length > 0) {
				$('<p><a target="_blank" href="'+entry.link+'" title="'+source+' - '+entry.title+'">' + entry.contentSnippet + '</p><hr/>').appendTo(mainCssClass);
			}
		});
	}