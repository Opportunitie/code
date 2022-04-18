import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'text widget',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Welcome to Flutter，反反复复烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦'),
        ),
        body: const Center(
          child: Text(
            'Hello World!反反复复烦烦烦烦烦烦烦烦烦烦烦烦烦烦反反复复烦烦烦烦烦烦烦烦烦烦烦烦烦',
            textAlign: TextAlign.center,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
                fontSize: 25.0,
                color: Color.fromARGB(255, 255, 125, 125),
                decoration: TextDecoration.underline,
                decorationStyle: TextDecorationStyle.dashed),
          ),
        ),
      ),
    );
  }
}
