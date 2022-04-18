import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'text widget',
      home: Scaffold(
        body: Center(
          child: Container(
            child: const Text('Hello World', style: TextStyle(fontSize: 40.0)),
            alignment: Alignment.topLeft,
            width: 500.0,
            height: 400.0,
            // color: Colors.lightBlue,
            padding: const EdgeInsets.fromLTRB(16.0, 16.0, 0.0, 0.0),
            margin: const EdgeInsets.all(10.0),
            decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Colors.lightBlue, Colors.greenAccent, Colors.purple],
                ),
                border: Border.all(
                  color: Colors.red,
                  width: 5.0,
                )),
          ),
        ),
      ),
    );
  }
}
