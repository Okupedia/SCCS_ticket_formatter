window.onload = function(){

    //csvの処理
    //const reporter_name = document.getElementById('reporter_name')
    const csv_input = document.getElementById('csv_input')
    const csv_contents = document.getElementById('csv_contents')

    //read_csv_button.onclick = function(){
    csv_input.addEventListener('change', () => {

        //FileReaderのインスタンスを作成する
        var reader = new FileReader();
        for(file of csv_input.files){
            console.log(file);
            //読み込んだファイルの中身を取得する
            reader.readAsText( file );
            //ファイルの中身を取得後に処理を行う
            reader.addEventListener( 'load', function() {
                //ファイルの中身をtextarea内に表示する
                formattedText = formattingCsv(reader.result)
                csv_contents.innerHTML = formattedText    
            })   
        }    
    })

    function formattingCsv(allText){
        var formattedText = ''
        var eachLineArray = allText.split('\n')
        for(var line = 0; line < eachLineArray.length-1; line++){
            var thisLine = eachLineArray[line]
            var eachContentsArray = thisLine.split(',')
            //[0]→time [1]→contents [2]→担当 [3]→チケット振り分け

           // if(eachContentsArray[3] === document.getElementById('reporter_name').value){
            
                //時間の表記
                const regex = /\b\d{1,2}:\d{2}\b/g;
                const time = eachContentsArray[0].match(regex);
                formattedText = formattedText + '[' + time + ']'
                //作業内容の追記
                formattedText = formattedText + eachContentsArray[1]
                //一行が終わるから+&br;して改行
                formattedText = formattedText + '&br;\n'

           // }
        }
      
        return formattedText
    }


    //全体の処理
    const outputArea = document.getElementById('outputArea');


    const inputButton = document.getElementById('input_button');
    inputButton.onclick = function () {
        pukiWikiText = ''
        console.log("button clicked")

       pukiWikiText = pukiWikiText + '**障害' +  document.getElementById('ID').value + '\n' + '\n'

       //1.概要
       const reported_time = document.getElementById('reported_time').value.replace(":", "")

       pukiWikiText = pukiWikiText + '*** 1. 障害の概要' + '\n'
       pukiWikiText = pukiWikiText + 'ID\t:0' + document.getElementById('ID').value + '&br;\n'
       pukiWikiText = pukiWikiText + '発生時刻\t:' + reported_time.replace(/^(\d{2})(\d{2})$/, "$1時$2分")+ '発生報告&br;\n'
       pukiWikiText = pukiWikiText + '発見者\t:' + document.getElementById('reporter_name').value + '<' + document.getElementById('reporter_mail').value + '>' + '&br;\n'
       pukiWikiText = pukiWikiText + '担当\t:' + document.getElementById('accespted_name').value + '&br;\n'
       pukiWikiText = pukiWikiText + '内容\t:' + document.getElementById('abstract').value + '&br;\n'

       pukiWikiText = pukiWikiText + '\n'

       pukiWikiText = pukiWikiText + '*** 2. 障害への対応' + '\n'
       pukiWikiText = pukiWikiText + '[' + document.getElementById('date').value + ']' + '&br;\n'
       pukiWikiText = pukiWikiText + document.getElementById('csv_contents').value + '\n'

       pukiWikiText = pukiWikiText + '\n'
       
       pukiWikiText = pukiWikiText + '*** 3. 原因の究明' + '\n'
        pukiWikiText = pukiWikiText + document.getElementById('cause_textarea').value.replace(/\n/g, '&br;\n')


        outputArea.innerHTML = pukiWikiText
    }

}