JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED, function (e, context, reason) {

    // console.log("============================");
    // console.log(e);
    // console.log(context);
    // console.log(reason);
    // console.log("============================");

    // if (reason === JIRA.CONTENT_ADDED_REASON.panelRefreshed) {
    //     var newContent = context[0];
    //
    //     if (newContent.tagName === "DIV" &amp;&amp; newContent.id.match(/my-id|my-second-id/)) {
    //         AJS.$("#"+newContent.id).replaceWith(newContent.outerHTML);
    //     }
    // }

    var ooAddRow = function (attElem) {
        console.log(attElem);
        return true;
    }

    // обновление нашего блока
    if (reason === JIRA.CONTENT_ADDED_REASON.panelRefreshed) {
        var refContent = context[0];

        console.log(" ++ ============================");
        // console.log(refContent);
        // console.log(refContent.tagName);
        // console.log(refContent.id.substring(0, 10));
        // console.log(" ++ ============================");

        if ((refContent.tagName === "OL") && (refContent.id.substring(0, 10) == "attachment")) {
            // тут надо обходить весь блок вложении чтобы переформировать наш блок
            //AJS.$("ol#refContent.id li")
            //console.log("===123===");

            // 1 - пробегаемся по идентификаторам вложении и сравниваем их с нашими вложениями
            // то есть подготавливаем массив идентификаторов наших вложений
            var ooAttArr =[];
            var arrObj = AJS.$("ol#oo_file_attachments li");
            var arrSize = arrObj.size();
            for (var i = 0; i < arrSize; i++) {
                ooAttArr[i] = AJS.$(arrObj[i]).attr("data-attachment-id");
            }
            console.log(ooAttArr);

            // 2 - пробегаемся по id вложений и сравниваем что есть в нашем массиве
            // arrObj = AJS.$("ol#" + refContent.id + " li");
            arrObj = AJS.$("ol#" + refContent.id + " li .attachment-delete a");
            arrSize = arrObj.size();
            var delId = "";
            var attId = "";
            for (var i = 0; i < arrSize; i++) {
                delId = AJS.$(arrObj[i]).attr("id");
                attId = delId.substring(4);
                if (ooAttArr.indexOf(attId) == -1) {
                    console.log("добавлен id " + attId);
                    // тут получается что найдено добавленное вложение, надо бы его также добавить в нашу панель
                    // добавлять будем через функцию
                    ooAddRow(AJS.$(AJS.$("ol#" + refContent.id + " li")[i]));
                }


            }


        }
    }

});
