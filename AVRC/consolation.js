(function(){

    //文字表示用の位置管理変数
    var pos_box1 = 1;
    var pos_box2 = 1;

    //要素の取得
    var elements = document.getElementsByClassName("drag-and-drop");
    var letter1 = document.getElementById("letter1") ;
    var letter2 = document.getElementById("letter2") ;
    var letter3 = document.getElementById("letter3") ;
    var letter4 = document.getElementById("letter4") ;
    var letter5 = document.getElementById("letter5") ;
    var letter6 = document.getElementById("letter6") ;
    var equal1 = document.getElementById("equal1") ;
    var equal2 = document.getElementById("equal2") ;
    var equal3 = document.getElementById("equal3") ;

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
        letter1.classList.remove("show");
        letter2.classList.remove("show");
        letter3.classList.remove("show");
        letter4.classList.remove("show");
        letter5.classList.remove("show");
        letter6.classList.remove("show");
        equal1.classList.remove("show");
        equal2.classList.remove("show");
        equal3.classList.remove("show");

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
        } else if (pos_y > grid * 2) {
            pos_y = grid * 2;
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

        for(var i = 0; i < 3; i++) {
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
                letter2.innerText = "";
                letter3.innerText = "";
                letter4.innerText = "";
                letter5.innerText = "";
                equal1.innerText = "　　＝　　";
                equal2.innerText = "";
                equal3.innerText = "";
                break;

            case 01:
                letter2.innerText = "フ　ン　ゴ";
                letter3.innerText = "ダ　キ　イ";
                letter4.innerText = "ア　バ　ス";
                letter5.innerText = "";
                equal1.innerText = "";
                equal2.innerText = "";
                equal3.innerText = "";
                break;

            case 02:
                letter2.innerText = "";
                letter3.innerText = "ア　マ　ク";
                letter4.innerText = "マ　ガ　ス";
                letter5.innerText = "";
                equal1.innerText = "";
                equal2.innerText = "";
                equal3.innerText = "";
                break;

            case 10:
                letter2.innerText = "レ　ト　ン";
                letter3.innerText = "パ　ダ　ス";
                letter4.innerText = "ア　キ　ウ";
                letter5.innerText = "";
                equal1.innerText = "";
                equal2.innerText = "";
                equal3.innerText = "";
                break;

            case 11:
                letter2.innerText = "";
                letter3.innerText = "";
                letter4.innerText = "";
                letter5.innerText = "";
                equal1.innerText = "";
                equal2.innerText = "　　＝　　";
                equal3.innerText = "";
                break;

            case 12:
                letter2.innerText = "";
                letter3.innerText = "フ　ン　ゴ";
                letter4.innerText = "ダ　キ　イ";
                letter5.innerText = "ア　バ　ス";
                equal1.innerText = "";
                equal2.innerText = "";
                equal3.innerText = "";
                break;

            case 20:
                letter2.innerText = "";
                letter3.innerText = "ロ　タ　ム";
                letter4.innerText = "シ　ハ　リ";
                letter5.innerText = "";
                equal1.innerText = "";
                equal2.innerText = "";
                equal3.innerText = "";
                break;

            case 21:
                letter2.innerText = "";
                letter3.innerText = "レ　ト　ン";
                letter4.innerText = "パ　ダ　ス";
                letter5.innerText = "ア　キ　ウ";
                equal1.innerText = "";
                equal2.innerText = "";
                equal3.innerText = "";
                break;

            case 22:
                letter2.innerText = "";
                letter3.innerText = "";
                letter4.innerText = "";
                letter5.innerText = "";
                equal1.innerText = "";
                equal2.innerText = "";
                equal3.innerText = "　　＝　　";
                break;

            default:
                letter2.innerText = "";
                letter3.innerText = "";
                letter4.innerText = "";
                letter5.innerText = "";
                equal1.innerText = "";
                equal2.innerText = "";
                equal3.innerText = "";
                break;
        }

        //文字を見えるように
        letter1.classList.add("show");
        letter2.classList.add("show");
        letter3.classList.add("show");
        letter4.classList.add("show");
        letter5.classList.add("show");
        letter6.classList.add("show");
        equal1.classList.add("show");
        equal2.classList.add("show");
        equal3.classList.add("show");

        //ムーブベントハンドラの消去
        document.body.removeEventListener("touchmove", mmove, false);
        drag.removeEventListener("touchend", mup, false);

        //クラス名 .drag も消す
        drag.classList.remove("drag");
    }

    })()
