/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment, jQuery, bootbox, _ */
var studentEdit = function () {
    'use strict';

    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/elephant/student',
        id: ''
    };

    // 全局Dom
    var jqueryMap = {
			$studentForm: null
    };

    var setJqueryMap = function () {
        jqueryMap.$studentForm = $('#studentForm');
    };

    var saveStudent = function (callback) {
        var blockTarget = jqueryMap.$studentForm.closest(".modal-content");
        App.blockUI({
            target: blockTarget,
            boxed: true,
            message: '正在保存数据...'
        });
        var interest = '';
        var selectedInterests = $('input[name="interest"]:checked');
        _.forEach(selectedInterests, function (value) {
            interest += value.value + ';';
        });

        var data = {
            name: $('input[name="name"]').val(),
            code: $('input[name="code"]').val(),
            sex: $('input[name="sex"]:checked').val(),
            age: $('input[name="age"]').val(),
            birthday: $('input[name="birthday"]').val()
        };

        var url = configMap.path + configMap.dataUrl;
        var requestType = 'POST';
        if (configMap.id) {
            url = url + "/" + configMap.id;
            requestType = 'PUT';
        }

		$.ajax({
            url: url,
            type: requestType,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                App.unblockUI(blockTarget);
                callback(true);
            },
            error: function () {
                App.unblockUI(blockTarget);
                App.alert({
                    container: jqueryMap.$studentForm.closest(".modal-body"),
                    place: 'prepend',
                    type: 'danger',
                    message: '保存失败！',
                    icon: 'fa fa-warning'
                });
                callback(false);
            }
        });
    };

    var getStudent = function (id) {
		$.ajax({
            url: configMap.path + configMap.dataUrl + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                $('[name="name"]').val(data.name);
                $('[name="code"]').val(data.code);
                $('[value="' + data.sex.toLowerCase() + '"]').iCheck('check');
                $('[name="age"]').val(data.age);
                $('.birthday').datepicker('update', moment(data.birthday).format('YYYY-MM-DD'));
            },
            error: function () {
                bootbox.alert('获取学生信息失败！');
            }
        });
    };

    var studentValidation = function () {
        jqueryMap.$studentForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: { // rules 中的属性name、code、sex等为Input的name属性值
                name: {
                    minlength: 2,
                    required: true
                },
                code: {
                    minlength: 2,
                    required: true
                },
                sex: {
                    required: true
                },
                interest: {
                    required: true,
                    minlength: 2
                },
                age: {
                    required: true,
                    number: true
                },
                birthday: {
                    required: true
                },
                nationality: {
                    required: true
                }
            },
            messages: { // 自定义显示消息
                sex: {
                    required: "请选择性别！"
                }
            },
            errorPlacement: function (error, element) { // 为每种input设置错误输出位置
                if (element.parent(".input-group").size() > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) {
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').size() > 0) {
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element) { // 高亮显示控件form-group和has-error都是样式类
                $(element)
                    .closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) { // 取消高亮显示
                $(element)
                    .closest('.form-group').removeClass('has-error');
            },
            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error');
            }
        });

        // 当下拉列表值发生变化时重新验证
        $('.nationality', jqueryMap.$studentForm).change(function () {
            jqueryMap.$studentForm.validate().element($(this));
        });

        // 日期发生变化时重新验证
        $('.birthday input[name="birthday"]').change(function () {
            jqueryMap.$studentForm.validate().element($(this));
        });
    };

    return {
        // 初始化
        init: function (id) {
            configMap.id = id;
            setJqueryMap();
            $('.birthday').datepicker({
                clearBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                language: 'zh-CN'
            });

            $('input[name="sex"]').iCheck({
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            });

            // 控件验证
            studentValidation();
            if (configMap.id) {
                getStudent(configMap.id);
            }
        },
        // 设置路径
        setPath: function (path) {
            configMap.path = path;
        },
        // 保存学生信息，参数为回掉函数
        saveStudent: function (callback) {
            if (jqueryMap.$studentForm.valid()) {
                saveStudent(callback);
            }
            else {
                callback(false);
            }
        }
    };
}();
//@ sourceURL=edit.js