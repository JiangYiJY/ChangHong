//<1>引入gulp
const gulp = require("gulp");

/*
	html
*/
gulp.task("copy-html", () => {
	return gulp.src("html/*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})
/*
	images 拷贝图片
*/
gulp.task("images", () => {
	return gulp.src("images/**/*")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})

/*
	将scss文件转成css文件
	生成两部分  min.css   .css
	gulp-scss  gulp-minify-css gulp-rename
*/
const scss = require("gulp-sass-china");
const minify = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("scss-index", () => {
	return gulp.src("scss/index.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minify())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
gulp.task("scss-register",()=>{
	return gulp.src("scss/register.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minify())
	.pipe(rename("register.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());

})
gulp.task("scss-login",()=>{
	return gulp.src("scss/login.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minify())
	.pipe(rename("login.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());

})
gulp.task("scss-slide", () => {
	return gulp.src("scss/slide.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minify())
	.pipe(rename("slide.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
gulp.task("scss-public", () => {
	return gulp.src("scss/public.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minify())
	.pipe(rename("public.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
gulp.task("scss-detail", () => {
	return gulp.src("scss/detail.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minify())
	.pipe(rename("detail.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
gulp.task("scss-list", () => {
	return gulp.src("scss/list.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minify())
	.pipe(rename("list.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
gulp.task("scss-pay", () => {
	return gulp.src("scss/pay.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minify())
	.pipe(rename("pay.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*
	拷贝js文件
*/

gulp.task("scripts", () => {
	return gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

/*
	拷贝data文件  整理数据源
*/
gulp.task("data", () => {
	return gulp.src("data/*.json")
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})


//上述操作都是整理文件的，作为整体，建立项目的整体，让他们一起执行。

gulp.task("build", ["copy-html", "images", "scripts", "data", "scss-index","scss-slide","scss-register","scss-public","scss-login",
	"scss-detail","scss-list","scss-pay"], () => {
	console.log("编译成功");
})

/*
	gulp的监听
*/
gulp.task("watch", function(){
	/*
		两个参数
		第一个参数我们要监听文件路径
		第二个参数我们监听到变化以后，要去执行的任务
	*/
	gulp.watch("html/*.html", ["copy-html"]);
	gulp.watch("images/**/*", ["images"]);
	gulp.watch("js/*.js", ["scripts"]);
	gulp.watch("data/*.json", ["data"]);
	gulp.watch("scss/index.scss", ["scss-index"])
	gulp.watch("scss/slide.scss", ["scss-slide"])
	gulp.watch("scss/register.scss",["scss-register"])
	gulp.watch("scss/login.scss",["scss-login"])
	gulp.watch("scss/public.scss",["scss-public"])
	gulp.watch("scss/detail.scss",["scss-detail"])
	gulp.watch("scss/list.scss",["scss-list"])
	gulp.watch("scss/pay.scss",["scss-pay"])

	
})

/*
	启动服务器
	gulp-connect
*/
var connect = require("gulp-connect");

gulp.task("server", function(){
	connect.server({
		root: "dist",
		port: 8888,
		livereload: true //自动刷新
	})
})


gulp.task("default", ["watch", "server"]);



















