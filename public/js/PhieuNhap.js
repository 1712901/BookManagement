// $(".btntrash").click(function(){
//     console.log("xdg");
//     console.log(this.parent());
// });
function submitPhieuNhap() {
    //let keys = Object.keys(localStorage);
    let data=[];
    if(localStorage.length==0){
        return;
    }
    for (var i = 0; i < localStorage.length; i++) {

        data[i] = {
            IDSACH: localStorage.key(i),
            SOLUONG: localStorage.getItem(localStorage.key(i))
        }
    }
    jQuery.post("/admin/addPhieu",{Phieu:data},function(data,status){
        let respon=jQuery.parseJSON(data);
        if(respon.status==200){
        console.log(respon.mess);
        localStorage.clear();
        // Hiển thị popup thành công

        $('#exampleModal').modal('toggle');
        }
    });
}
function sunbmitBookForm(){
    $("#FormInfBook").submit(function(data){
        console.log(data);
    });
}
function inFocusOut(inp,min){
    const val=$(inp).val();
    const idBook=$(inp).parent().parent().find('th').text();
    console.log(min+"-"+val);
    if(val>=min){
    localStorage.setItem(idBook,val);
    $(inp).tooltip("hide");
    }else{
        $(inp).tooltip("show");
        $(inp).val(min);
        localStorage.setItem(idBook,min);

    }
}
function FucOnMouseMove(inp){
    $(inp).tooltip("hide");
}