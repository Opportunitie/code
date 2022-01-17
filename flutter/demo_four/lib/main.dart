import 'package:flutter/material.dart';
// router animation
import 'router/page_change_animation.dart';
// pages
import 'example20/draggable_demo.dart';
import 'example03/index.dart';
import 'example04/index.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "demo 03",
      theme: ThemeData(
        primaryColor: Colors.blue,
      ),
      home: const MyNav(),
    );
  }
}

class MyNav extends StatelessWidget {
  const MyNav({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("首页"),
        titleTextStyle: const TextStyle(fontSize: 16.0),
        elevation: 0.0,
      ),
      body: Container(
        decoration: const BoxDecoration(color: Colors.white),
        margin: const EdgeInsets.fromLTRB(16.0, 0, 16.0, 0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(context, CustomRoute(const FirstPage()));
                      },
                      child: const Text('example03')),
                ),
                const Padding(padding: EdgeInsets.fromLTRB(0, 0, 16.0, 0)),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(context, CustomRoute(const Demo04()));
                    },
                    child: const Text('example04'),
                  ),
                ),
              ],
            ),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                            context, CustomRoute(const DraggableDemo()));
                      },
                      child: const Text('example20')),
                ),
                // const Padding(padding: EdgeInsets.fromLTRB(0, 0, 16.0, 0)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
