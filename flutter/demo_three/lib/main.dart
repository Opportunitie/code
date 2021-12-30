import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: "Row Widget Demo",
        home: Scaffold(
          appBar: AppBar(
            title: const Text("垂直方向布局"),
          ),
          body: const Center(
            child: Text('11'),
          ),
        ));
  }
}
