(function(){

    //文字表示用の位置管理変数
    var pos_box1 = 1;
    var pos_box2 = 1;

    //要素の取得
    var elements = document.getElementsByClassName("drag-and-drop");
    var letter = document.getElementById("letter") ;

    //要素内のクリックされた位置を取得する変数
    var y;
    var pos_y;
    var grid = document.getElementById("box1").clientHeight /4;

    //要素内がタップされたときに発火
    for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("touchstart", mdown, false);
    }

    //タップされた瞬間の関数
    function mdown(e) {

        //クラス名に .drag を追加
        this.classList.add("drag");
        this.classList.remove("smooth");

        //文字表示を消す
        letter.classList.remove("show");

        //タッチイベントとマウスのイベントの差異を吸収
        var event = e.changedTouches[0];

        //要素内の相対座標を取得
        y = event.pageY - this.offsetTop;

        //ムーブイベントにコールバック
        document.body.addEventListener("touchmove", mmove, {passive:false});

        //タップの場合はすぐこちらに移動
        this.addEventListener("touchend", mup, false);
        document.body.addEventListener("touchleave", mup, false);
    }

    //動いている間の関数
    function mmove(e) {

        //ドラッグしている要素を取得
        var drag = document.getElementsByClassName("drag")[0];

        //同様にマウスとタッチの差異を吸収
        var event = e.changedTouches[0];

        //フリックしたときに画面を動かさないようにデフォルト動作を抑制
        e.preventDefault();

        //指が動いた場所に要素を動かす
        pos_y = event.pageY - y;
        if (pos_y < 0) {
            pos_y = 0;
        } else if (pos_y > grid * 3) {
            pos_y = grid * 3;
        }
        drag.style.top = pos_y + "px";

        //指が離れたら発火
        drag.addEventListener("touchend", mup, false);
        document.body.addEventListener("touchleave", mup, false);

    }

    //指が離れた時の関数
    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];

        drag.classList.add("smooth");

        for(var i = 0; i < 4; i++) {
            if (grid * (i-0.5) <= pos_y && pos_y < grid * (i+0.5)) {
                drag.style.top = grid * i +"px";
                if (drag.getAttribute('id') == "box1") {
                    pos_box1 = i;
                } else {
                    pos_box2 = i;
                }
            }
        }

        //boxの位置によって文字を変化
        switch(pos_box1*10+pos_box2) {
            case 00:
                letter.innerText = "ジ　ウ　ア";
                break;

            case 01:
                letter.innerText = "ア　バ　ス";
                break;

            case 02:
                letter.innerText = "マ　ガ　ス";
                break;

            case 03:
                letter.innerText = "ア　レ　　";
                break;

            case 10:
                letter.innerText = "ア　キ　ウ";
                break;

            case 11:
                letter.innerText = "エ　カ　ワ";
                break;

            case 12:
                letter.innerText = "タ　ム　グ";
                break;

            case 13:
                letter.innerText = "ア　マ　ク";
                break;

            case 20:
                letter.innerText = "ク　ウ　　";
                break;

            case 21:
                letter.innerText = "パ　ダ　ス";
                break;

            case 22:
                letter.innerText = "パ　グ　フ";
                break;

            case 23:
                letter.innerText = "フ　ン　ゴ";
                break;

            case 30:
                letter.innerText = "ゲ　イ　ウ";
                break;

            case 31:
                letter.innerText = "バ　ガ　ド";
                break;

            case 32:
                letter.innerText = "レ　ト　ン";
                break;

            case 33:
                letter.innerText = "ガ　マ　ク";
                break;

            default:
                letter.innerText = "";
                break;
        }

        //文字を見えるように
        letter.classList.add("show");

        //ムーブベントハンドラの消去
        document.body.removeEventListener("touchmove", mmove, false);
        drag.removeEventListener("touchend", mup, false);

        //クラス名 .drag も消す
        drag.classList.remove("drag");
    }

    })()
