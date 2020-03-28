(function(){

//文字表示用の位置管理変数
var pos_box1 = 1;
var pos_box2 = 1;

//要素の取得
var elements = document.getElementsByClassName("drag-and-drop");

//要素内のタッチされた位置を取得する変数
var y;
var pos_y;
var grid = document.getElementById("box1").clientHeight /4;

//要素内でタッチされたとき発火
for(var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("touchstart", mdown, false);
}

//タッチされたときの関数
function mdown(e) {

    //クラス名に .drag を追加
    this.classList.add("drag");

    document.getElementById("letter1").innerText = "";
    document.getElementById("letter2").innerText = "";
    document.getElementById("letter3").innerText = "";
    document.getElementById("letter4").innerText = "";
    document.getElementById("letter5").innerText = "";
    document.getElementById("letter6").innerText = "";

    //タッチデイベントとマウスのイベントの差異を吸収
    var event = e.changedTouches[0];

    //要素内の相対座標を取得
    y = event.pageY - this.offsetTop;

    //ムーブイベントにコールバック
    document.body.addEventListener("touchmove", mmove, {passive:false});
}

//指を動かしたときに発火
function mmove(e) {

    //スライドしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];

    //同様にマウスとタッチの差異を吸収
    var event = e.changedTouches[0];

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    //要素を動かす、ただし端をはみ出ない
    pos_y = event.pageY - y;
    if (pos_y < 0) {
        pos_y = 0;
    } else if (pos_y > grid * 2) {
        pos_y = grid * 2;
    }
    drag.style.top = pos_y + "px";

    //離れたときに発火
    drag.addEventListener("touchend", mup, false);
    document.body.addEventListener("touchleave", mup, false);

}

//指を離したときの関数
function mup(e) {
    var drag = document.getElementsByClassName("drag")[0];

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

    switch(pos_box1*10+pos_box2) {
        case 01:
            document.getElementById("letter2").innerText = "フ　ン　ゴ";
            document.getElementById("letter3").innerText = "ダ　キ　イ";
            document.getElementById("letter4").innerText = "ア　バ　ス";
            break;

        case 02:
            document.getElementById("letter3").innerText = "ア　マ　ク";
            document.getElementById("letter4").innerText = "マ　ガ　ス";
            break;

        case 10:
            document.getElementById("letter2").innerText = "レ　ト　ン";
            document.getElementById("letter3").innerText = "パ　ダ　ス";
            document.getElementById("letter4").innerText = "ア　キ　ウ";
            break;

        case 12:
            document.getElementById("letter3").innerText = "フ　ン　ゴ";
            document.getElementById("letter4").innerText = "ダ　キ　イ";
            document.getElementById("letter5").innerText = "ア　バ　ス";
            break;

        case 20:
            document.getElementById("letter3").innerText = "ロ　タ　ム";
            document.getElementById("letter4").innerText = "シ　ハ　リ";
            break;

        case 21:
            document.getElementById("letter3").innerText = "レ　ト　ン";
            document.getElementById("letter4").innerText = "パ　ダ　ス";
            document.getElementById("letter5").innerText = "ア　キ　ウ";
            break;
    }

    //ムーブベントハンドラの消去
    document.body.removeEventListener("touchmove", mmove, false);
    drag.removeEventListener("touchend", mup, false);

    //クラス名 .drag も消す
    drag.classList.remove("drag");
}

})()
