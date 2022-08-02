const url = "https://www.hpa.gov.tw/wf/newsapi.ashx?startdate=2022/07/23";

function getData(){
	fetch(url).then(function(response){
		return response.json();
	}).then(function(data){
		//console.log(data);
		const list = document.querySelector('.list');
		let str = "";
		for(let i = 0; i < data.length;i++){
			const news = data[i];
			const newsItem = 
				{
					"title":news.標題,
					"content":news.內容,
					"connectionUrl":news.連結網址,
					"dateOfIssue":news.發布日期,
					"lastUpdateDate":news.修改日期,
				}
			//console.log(newsItem);
			
			let addStr="";
				for(let j = 0 ; j < news.附加檔案.length;j++){
					const dataNews = news.附加檔案[j];
					const dataNewsItem = 
						{
							"descriptionFile":dataNews.檔案說明,
							"fileName":dataNews.檔案名稱,
							"connectionUrl":dataNews.連結位置
						}
					//console.log(dataNewsItem);

					let addContent =`
					<ul>
						<li>${dataNewsItem.descriptionFile}</li>
						<li>${dataNewsItem.fileName}</li>
						<li>${dataNewsItem.connectionUrl}</li>
					</ul>`
					addStr += addContent;
				}

			let content =`
			<tr>
				<td>${newsItem.title}</td>
				<td>${newsItem.content}</td>
				<td>${newsItem.connectionUrl}</td>
				<td>`+addStr+`</td>
				<td>${newsItem.dateOfIssue}</td>
				<td>${newsItem.lastUpdateDate}</td>
			</tr>`;
			str+=content;
			list.innerHTML=str;
		}
	}
	);
}
getData();