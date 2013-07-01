Ext.data.JsonP.Ext_Error({"tagname":"class","name":"Ext.Error","extends":"Error","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"code_type":"assignment","inheritable":false,"inheritdoc":null,"meta":{"author":["Brian Moeskau <brian@sencha.com>"],"docauthor":["Brian Moeskau <brian@sencha.com>","译者: Sean<caochengbo12@qq.com>"]},"id":"class-Ext.Error","members":{"cfg":[],"property":[],"method":[{"name":"constructor","tagname":"method","owner":"Ext.Error","meta":{},"id":"method-constructor"},{"name":"toString","tagname":"method","owner":"Ext.Error","meta":{},"id":"method-toString"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[{"name":"ignore","tagname":"property","owner":"Ext.Error","meta":{"static":true},"id":"static-property-ignore"},{"name":"notify","tagname":"property","owner":"Ext.Error","meta":{"static":true},"id":"static-property-notify"}],"method":[{"name":"handle","tagname":"method","owner":"Ext.Error","meta":{"static":true},"id":"static-method-handle"},{"name":"raise","tagname":"method","owner":"Ext.Error","meta":{"static":true},"id":"static-method-raise"}],"event":[],"css_var":[],"css_mixin":[]},"files":[{"filename":"Error.js","href":"Error.html#Ext-Error"}],"html_meta":{"author":null,"docauthor":null},"component":false,"superclasses":["Error"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Error<div class='subclass '><strong>Ext.Error</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Error.html#Ext-Error' target='_blank'>Error.js</a></div></pre><div class='doc-contents'><p>原生JavaScript Error对象的一个包装类，针对Ext的应用程序中的错误处理增加一些有用的功能。\n当您使用Ext.Error从使用Ext 4类系统的任意类中<a href=\"#!/api/Ext.Error-static-method-raise\" rel=\"Ext.Error-static-method-raise\" class=\"docClass\">raise</a>提出一个错误，\nError可以自动添加提出错误的源类和方法。\n他还包括自动记录到控制台的逻辑错误，如果可用的话，及关于错误的其他元数据。\n在所有情况下，错误将始终在结束时提出，\n这样执行也会中止。</p>\n\n<p>Ext.Error还提供了一个全局的错误 <a href=\"#!/api/Ext.Error-static-method-handle\" rel=\"Ext.Error-static-method-handle\" class=\"docClass\">处理</a> 方法，可以重写，\n以在整个应用程序范围中处理错误单点。你可以选择完全<a href=\"#!/api/Ext.Error-static-property-ignore\" rel=\"Ext.Error-static-property-ignore\" class=\"docClass\">ignore</a>忽略错误，\n虽然在实际应用中它通常被更好的用来覆盖处理函数和执行日志记录，\n或是具有实际意义的应用程序的一些其他方法的错误报告。</p>\n\n<p>以最简单方式，你可以简单地从任意代码内提出错误，将其作为一个简单的字符串:</p>\n\n<p>用法示例:</p>\n\n<pre><code><a href=\"#!/api/Ext.Error-static-method-raise\" rel=\"Ext.Error-static-method-raise\" class=\"docClass\">Ext.Error.raise</a>('Something bad happened!');\n</code></pre>\n\n<p>如果从普通的JavaScript代码提出，错误将被记录到控制台（如果可用）和显示消息。\n然而在大多数情况下，你会从一个类内部提出错误，它往往对可能添加有关正在提出的错误的附加元数据非常有用。\n<a href=\"#!/api/Ext.Error-static-method-raise\" rel=\"Ext.Error-static-method-raise\" class=\"docClass\">raise</a>的方法还可以配置对象。\n在这种形式下<code>msg</code>属性将成为错误的描述，并且添加到配置中的其他任意数据都会添加到错误的对象，\n如果控制台是可用的，则记录到控制台来检查。</p>\n\n<p>用法示例:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Ext.Foo', {\n    doSomething: function(option){\n        if (someCondition === false) {\n            <a href=\"#!/api/Ext.Error-static-method-raise\" rel=\"Ext.Error-static-method-raise\" class=\"docClass\">Ext.Error.raise</a>({\n                msg: 'You cannot do that!',\n                option: option,   // 无论什么被传递到该方法\n                'error code': 100 // 其他任意信息\n            });\n        }\n    }\n});\n</code></pre>\n\n<p>如果控制台可用(支持 <code>console.dir</code> 函数)，你会看到控制台输出类似:</p>\n\n<pre><code>提出以下数据错误:\noption:         Object { foo: \"bar\"}\n    foo:        \"bar\"\nerror code:     100\nmsg:            \"You cannot do that!\"\nsourceClass:   \"Ext.Foo\"\nsourceMethod:  \"doSomething\"\n\nuncaught exception: You cannot do that!\n</code></pre>\n\n<p>正如您所看到的，错误将报告提出它的确切位置，\n并将包括尽可能多的为提高代码质量提供有益的信息。</p>\n\n<p>如果你想要处理全局范围内的所有应用程序错误你可以简单地重写静态<a href=\"#!/api/Ext.Error-static-method-handle\" rel=\"Ext.Error-static-method-handle\" class=\"docClass\">handle</a>方法，\n并提供任何你需要的处理逻辑。如果该方法返回 true，则错误被认为已处理，\n并不会在浏览器抛出异常。返回除了true之外的任何值通常会提出错误。</p>\n\n<p>用法示例:</p>\n\n<pre><code><a href=\"#!/api/Ext.Error-static-method-handle\" rel=\"Ext.Error-static-method-handle\" class=\"docClass\">Ext.Error.handle</a> = function(err) {\n    if (err.someProperty == 'NotReallyAnError') {\n        // 也许日志记录信息到这里的应用程序(如果适用)\n        return true;\n    }\n    // 返回任何非true值(包括none)将导致错误产生\n}\n</code></pre>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Properties</h3><div id='static-property-ignore' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Error'>Ext.Error</span><br/><a href='source/Error.html#Ext-Error-static-property-ignore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Error-static-property-ignore' class='name expandable'>ignore</a><span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>静态标志位，如果设置为true，可以将浏览器禁用全局范围内的错误报告\n(默认为false)。 ...</div><div class='long'><p>静态标志位，如果设置为true，可以将浏览器禁用全局范围内的错误报告\n(默认为false)。\n请注意,如果你忽略Ext错误很可能其他一些代码可能失败,之后抛出一个原生JavaScript错误,所以使用时必须小心。\n在大多数情况下它可能会更可取，而是提供一个自定义错误<a href=\"#!/api/Ext.Error-static-method-handle\" rel=\"Ext.Error-static-method-handle\" class=\"docClass\">处理</a>函数。</p>\n\n<p>用法示例:</p>\n\n<pre><code><a href=\"#!/api/Ext.Error-static-property-ignore\" rel=\"Ext.Error-static-property-ignore\" class=\"docClass\">Ext.Error.ignore</a> = true;\n</code></pre>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='static-property-notify' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Error'>Ext.Error</span><br/><a href='source/Error.html#Ext-Error-static-property-notify' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Error-static-property-notify' class='name expandable'>notify</a><span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>静态标志位，可以用于在全局范围内控制错误并通知给用户。 ...</div><div class='long'><p>静态标志位，可以用于在全局范围内控制错误并通知给用户。\n不像Ex.Error.ignore，这并不影响异常。它们仍然会被抛出。\n此值可以设置为 false，将禁用警告通知(对于IE6和IE7默认值为true)。</p>\n\n<p>只有第一个错误会产生一个警告。\n内部发生第一个错误显示警报之前，这个标志位被设置为false。</p>\n\n<p>在发布版本中不使用此标志位。</p>\n\n<p>用法示例:</p>\n\n<pre><code><a href=\"#!/api/Ext.Error-static-property-notify\" rel=\"Ext.Error-static-property-notify\" class=\"docClass\">Ext.Error.notify</a> = false;\n</code></pre>\n</div></div></div></div></div><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance Methods</h3><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Error'>Ext.Error</span><br/><a href='source/Error.html#Ext-Error-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Ext.Error-method-constructor' class='name expandable'>Ext.Error</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>/<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> config</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>创建新的Error对象。 ...</div><div class='long'><p>创建新的Error对象。</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>/<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>错误消息字符串，或一个包含\"msg\"属性的对象，将用作该错误消息。\n包含在对象中的其他任意数据将被应用到错误实例并记录到浏览器控制台，\n如果有的话。</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-toString' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Error'>Ext.Error</span><br/><a href='source/Error.html#Ext-Error-method-toString' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Error-method-toString' class='name expandable'>toString</a>( <span class='pre'></span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></div><div class='description'><div class='short'>提供自定义字符串表示的错误对象。这是基于Object.toString方法的一个重写，\n这是有用的，这样记录到浏览器的控制台时，\n一个错误的对象将显示一个有用的信息，而不是[object Object]，默认的toString结果。 ...</div><div class='long'><p>提供自定义字符串表示的错误对象。这是基于<code><a href=\"#!/api/Object-method-toString\" rel=\"Object-method-toString\" class=\"docClass\">Object.toString</a></code>方法的一个重写，\n这是有用的，这样记录到浏览器的控制台时，\n一个错误的对象将显示一个有用的信息，而不是<code>[object Object]</code>，默认的<code>toString</code>结果。</p>\n\n<p>默认实现将包括错误消息以及引起错误的类和方法，如果有的话，\n但是这可能是在原型级（针对所有错误），或是一个特定的错误实例的自定义实现覆盖，\n如果您想要提供一个自定义的描述，就会显示在控制台上。</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>该错误消息。如果从EXT 4类系统引起，\n错误消息还将包括引起该错误的类和方法名称，如果有的话。</p>\n</div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Methods</h3><div id='static-method-handle' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Error'>Ext.Error</span><br/><a href='source/Error.html#Ext-Error-static-method-handle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Error-static-method-handle' class='name expandable'>handle</a>( <span class='pre'><a href=\"#!/api/Ext.Error\" rel=\"Ext.Error\" class=\"docClass\">Ext.Error</a> err</span> )<strong class='static signature'>static</strong></div><div class='description'><div class='short'>全局作用域内处理可能提出的任何Ext错误，可以选择提供自定义的逻辑来分别处理不同的错误。 ...</div><div class='long'><p>全局作用域内处理可能提出的任何Ext错误，可以选择提供自定义的逻辑来分别处理不同的错误。\n从函数返回true绕过给浏览器提出错误，\n否则将提出错误，并且执行将中止。</p>\n\n<p>用法示例:</p>\n\n<pre><code><a href=\"#!/api/Ext.Error-static-method-handle\" rel=\"Ext.Error-static-method-handle\" class=\"docClass\">Ext.Error.handle</a> = function(err) {\n    if (err.someProperty == 'NotReallyAnError') {\n        // 这里如果适用或许会记录一些日志到应用程序\n        return true;\n    }\n    // 任何非true返回值(包括none)会导致错误被抛出\n}\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>err</span> : <a href=\"#!/api/Ext.Error\" rel=\"Ext.Error\" class=\"docClass\">Ext.Error</a><div class='sub-desc'><p>将要被提出的Ext.Error对象。它将包含最初提出的此对象的任意属性，\n再加上有关引起错误起源的方法和类\n(如果提出的一个类使用了Ext 4类系统)的属性。</p>\n</div></li></ul></div></div></div><div id='static-method-raise' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Error'>Ext.Error</span><br/><a href='source/Error.html#Ext-Error-static-method-raise' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Error-static-method-raise' class='name expandable'>raise</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>/<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> err</span> )<strong class='static signature'>static</strong></div><div class='description'><div class='short'>提出一个错误，它可以包括其他数据，并支持控制台自动记录日志，如果可用的话。 ...</div><div class='long'><p>提出一个错误，它可以包括其他数据，并支持控制台自动记录日志，如果可用的话。\n你可以传递一个错误消息的字符串或具有<code>msg</code>属性的对象，将被用作错误消息。\n对象可以包含其他任意名称-值属性(或对象列表)\n与错误一起记录。</p>\n\n<p>请注意，显示错误消息后，一个JavaScript错误最终会被抛出，\n因此，将停止执行。</p>\n\n<p>用法示例:</p>\n\n<pre><code><a href=\"#!/api/Ext.Error-static-method-raise\" rel=\"Ext.Error-static-method-raise\" class=\"docClass\">Ext.Error.raise</a>('A simple string error message');\n\n// 或者...\n\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Ext.Foo', {\n    doSomething: function(option){\n        if (someCondition === false) {\n            <a href=\"#!/api/Ext.Error-static-method-raise\" rel=\"Ext.Error-static-method-raise\" class=\"docClass\">Ext.Error.raise</a>({\n                msg: 'You cannot do that!',\n                option: option,   // 无论什么被传递到该方法\n                'error code': 100 // 其他任意信息\n            });\n        }\n    }\n});\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>err</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>/<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>错误消息字符串，或一个包含\"msg\"属性的对象，将用作该错误消息。\n包含在对象中的其他任意数据也将被记录到浏览器控制台，\n如果有的话。</p>\n</div></li></ul></div></div></div></div></div></div></div>"});