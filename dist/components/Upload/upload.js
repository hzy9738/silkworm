var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import axios from 'axios';
import { useRef, useState } from 'react';
import UploadList from './uploadList';
import Dragger from './dragger';
export var Upload = function (props) {
    var action = props.action, defaultFileLst = props.defaultFileLst, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children;
    var fileInput = useRef(null);
    var _a = useState(defaultFileLst || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (uploadFile, uploadObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === uploadFile.uid) {
                    return __assign(__assign({}, file), uploadObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleRemove = function (file) {
        var files = fileList.filter(function (item) { return item.uid !== file.uid; });
        setFileList(files);
        if (onRemove) {
            onRemove(file);
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            e.target.value = '';
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result) {
                    if (result instanceof Promise) {
                        result.then(function (processedFile) {
                            post(processedFile);
                        });
                    }
                    else {
                        post(file);
                    }
                }
            }
        });
    };
    var post = function (file) {
        if (!action) {
            console.error('action is empty');
            return;
        }
        var _file = {
            uid: Date.now() + '-upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            raw: file,
            percent: 0
        };
        setFileList(__spreadArray([_file], fileList, true));
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    console.log(percentage);
                    if (onProgress) {
                        onProgress(percentage, __assign(__assign({}, _file), { percent: percentage, status: 'uploading' }));
                    }
                }
            }
        }).then(function (resp) {
            console.log(resp);
            updateFileList(_file, { percent: 100, status: 'success', response: resp.data, raw: file });
            if (onSuccess) {
                onSuccess(resp.data, __assign(__assign({}, _file), { percent: 100, status: 'success', response: resp.data, raw: file }));
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(function (error) {
            console.error(error);
            updateFileList(_file, { status: 'error', error: error, raw: file });
            if (onError) {
                onError(error, __assign(__assign({}, _file), { status: 'error', error: error, raw: file }));
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    return (_jsxs("div", __assign({ className: 'zongone-upload-component' }, { children: [_jsx("div", __assign({ className: 'zongone-upload-input', style: { display: 'inline-block' }, onClick: handleClick }, { children: drag ? _jsxs(Dragger, __assign({ onFile: function (files) {
                        uploadFiles(files);
                    } }, { children: [" ", children, " "] })) : children })), _jsx("input", { className: 'zongone-file-input', style: { display: 'none' }, onChange: handleFileChange, ref: fileInput, accept: accept, multiple: multiple, type: 'file' }), _jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
