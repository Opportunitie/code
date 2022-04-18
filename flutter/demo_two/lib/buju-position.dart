import 'dart:ui';

import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    var stack = Stack(
      alignment: const FractionalOffset(0.5, 1),
      children: const <Widget>[
        CircleAvatar(
          backgroundImage: NetworkImage(
              "http://img31.mtime.cn/mg/2014/03/06/095801.37640458.jpg"),
          radius: 100.0,
        ),
        // Container(
        //   decoration: const BoxDecoration(
        //     color: Colors.lightBlue,
        //   ),
        //   padding: const EdgeInsets.all(5.0),
        //   child: const Text("肖申克的救赎"),
        // ),
        Positioned(
            top: 0.0,
            left: 50.0,
            child: Text(
              "肖申克的救赎",
              style: TextStyle(color: Colors.lightBlue),
            )),
        Positioned(
            bottom: 10.0,
            right: 80.0,
            child: Text(
              "神剧",
              style: TextStyle(color: Colors.lightBlue),
            )),
      ],
    );
    return MaterialApp(
        title: "Row Widget Demo",
        home: Scaffold(
          appBar: AppBar(
            title: const Text("垂直方向布局"),
          ),
          body: Center(
            child: stack,
          ),
        ));
  }
}
