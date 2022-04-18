import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp([Key? key]) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "List View",
      home: Scaffold(
          appBar: AppBar(
            title: const Text('ListView Widget'),
          ),
          // body: GridView.count(
          //   padding: const EdgeInsets.all(20.0),
          //   crossAxisSpacing: 10.0,
          //   crossAxisCount: 3,
          //   children: const <Widget>[
          //     Text("I am wt"),
          //     Text("I love web"),
          //     Text("w love book"),
          //     Text("I love write blog"),
          //     Text("I am wt"),
          //     Text("I lick eat hot pot1"),
          //   ],
          // )),
          body: GridView(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                mainAxisSpacing: 16.0,
                crossAxisSpacing: 16.0,
                childAspectRatio: 0.7), // 宽/高
            children: <Widget>[
              Image.network(
                  "http://img5.mtime.cn/mg/2021/11/26/094832.18055051.jpg",
                  fit: BoxFit.cover),
              Image.network(
                  "http://img5.mtime.cn/mg/2021/11/26/094832.18055051.jpg",
                  fit: BoxFit.cover),
              Image.network(
                  "http://img5.mtime.cn/mg/2021/11/26/094832.18055051.jpg",
                  fit: BoxFit.cover),
              Image.network(
                  "http://img5.mtime.cn/mg/2021/11/26/094832.18055051.jpg",
                  fit: BoxFit.cover),
              Image.network(
                  "http://img5.mtime.cn/mg/2021/11/26/094832.18055051.jpg",
                  fit: BoxFit.cover),
              Image.network(
                  "http://img5.mtime.cn/mg/2021/11/26/094832.18055051.jpg",
                  fit: BoxFit.cover),
            ],
          )),
    );
  }
}
