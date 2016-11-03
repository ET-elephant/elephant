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

/*global $, App, moment, jQuery, bootbox, studentEdit */
var student = function () {
	'use strict';

	// 全局属性参数
	var configMap = {
		path: '',
		dataUrl: '/elephant/student',
		datatablesLanguageFile: '/assets/global/plugins/datatables/chinese.json',
		studentGrid: null,
		editPageUrl: '/elephant/editStudent.jsp',
		viewPageUrl: '/elephant/viewStudent.jsp',
		editBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑学生信息"><i class="fa fa-edit"></i></a>',
		deleteBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除学生"><i class="fa fa-times"></i></a>',
		viewBtn_html: '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="查看学生信息"><i class="fa fa-search"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget: null,
		$studentDialog: null
	};

	var setJqueryMap = function () {
		jqueryMap.$blockTarget = $('body');
	};

	var initStudentData = function () {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在加载数据，请稍候...'
		});
		$.ajax({
			url: configMap.path + configMap.dataUrl,
			dataType: 'JSON',
			type: 'GET',
			success: function (datas) {
				configMap.studentGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);
				if (datas.length > 0) {
					return configMap.studentGrid.rows.add(datas).draw();
				}
			},
			error: function () {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};

	var openModal = function (title, url, type) {
		var dialogButtons = {
			cancel: {
				label: '关闭',
				className: 'btn-default'
			}
		};

		if (type === 'edit') {
			dialogButtons.success = {
				label: "保存",
				className: "btn-success",
				callback: function () {
					studentEdit.saveStudent(function (result) {
						if (result) {
							initStudentData();
							jqueryMap.$studentDialog.modal('hide');
						}
					});

					return false;
				}
			};
		}

		$.get(url, function (html) {
			jqueryMap.$studentDialog = bootbox.dialog({
				title: title,
				message: html,
				buttons: dialogButtons
			});
		});
	};

	var viewStudent = function () {
		var el = $(this);
		var rowIndex = configMap.studentGrid.cell(el.parent()).index().row;
		var id = configMap.studentGrid.row(rowIndex).data().id;
		openModal("查看学生信息", configMap.path + configMap.viewPageUrl + "?id=" + encodeURI(id), 'view');
	};

	var addStudent = function () {
		openModal('添加学生信息', configMap.path + configMap.editPageUrl, 'edit');
	};

	var editStudent = function () {
		var el = $(this);
		var rowIndex = configMap.studentGrid.cell(el.parent()).index().row;
		var id = configMap.studentGrid.row(rowIndex).data().id;
		openModal('编辑学生信息', configMap.path + configMap.editPageUrl + "?id=" + encodeURI(id), 'edit');
	};

	var delStudent = function (event, element) {
		App.blockUI({
			target: jqueryMap.$blockTarget,
			boxed: true,
			message: '正在删除数据，请稍候...'
		});

		var rowIndex = configMap.studentGrid.cell(element.parent()).index().row;
		var id = configMap.studentGrid.row(rowIndex).data().id;
		$.ajax({
			url: configMap.path + configMap.dataUrl + "/" + id,
			type: 'DELETE',
			success: function (result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result) {
					initStudentData();
					Messenger().post("删除成功!");
				}
				else {
					Messenger().post({
						message: "删除成功!",
						type: 'error'
					});
				}
			},
			error: function () {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};

	var initStudentGrid = function () {
		configMap.studentGrid = $('#student_data').DataTable({
			"dom": 'rt<"row"<"col-md-6"<"pull-left"i><"pull-left"l>><"col-md-6"p>><"clear">',
			"ordering": false,
			"destroy": true,
			"lengthMenu": [10, 20, 50, 100],
			"autoWidth": false,
			"columns": [
				{"data": "name"},
				{"data": "code"},
				{"data": "sex"},
				{"data": "age"},
				{
					"data": "birthday",
					"render": function (data, type, row) {
						return moment(data).format('YYYY-MM-DD');
					}
				},
				{
					"render": function (data, type, row) {
						return configMap.editBtn_html + configMap.deleteBtn_html + configMap.viewBtn_html;
					}
				}
			],
			"language": {
				url: configMap.path + configMap.datatablesLanguageFile
			},
			"drawCallback": function () { // 数据加载完成后执行
				var tootipContainer = $('[data-toggle="tooltip"]');
				var editContainer = $('[data-type="edit"]');
				var delContainer = $('[data-type="del"]');
				var viewContainer = $('[data-type="view"]');

				if (tootipContainer.length > 0) {
					tootipContainer.tooltip();
				}

				if (editContainer.length > 0) {
					editContainer.off('click').on('click', editStudent);
				}

				if (delContainer.length > 0) {
					delContainer.confirmation({
						"title": '确定要删除？',
						"btnOkLabel": '是',
						"btnCancelLabel": '否',
						"placement": 'left',
						"onConfirm": delStudent
					});
				}

				if (viewContainer.length > 0) {
					viewContainer.off('click').on('click', viewStudent);
				}
			}
		});
	};

	return {
		init: function () {
			$('#btnNew').off('click').on('click', function () {
				addStudent();
			});

			setJqueryMap();
			initStudentGrid();
			initStudentData();
		},
		setPath: function (path) {
			configMap.path = path;
		}
	};
}();
//@ sourceURL=student.js