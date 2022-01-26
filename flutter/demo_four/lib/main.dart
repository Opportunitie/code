import 'package:flutter/material.dart';
// router animation
import 'router/page_change_animation.dart';
// pages
import 'example01/index.dart';
import 'example02/index.dart';
import 'example03/index.dart';
import 'example04/index.dart';
import 'example05/index.dart';
import 'example05_01/index.dart';
import 'example06/index.dart';
import 'example20/draggable_demo.dart';

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
    return MaterialApp(
      title: "首页",
      theme: ThemeData.light(),
      home: Scaffold(
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
                          Navigator.push(
                              context, CustomRoute(const Example01()));
                        },
                        child: const Text('example01')),
                  ),
                  const Padding(padding: EdgeInsets.fromLTRB(0, 0, 16, 0)),
                  Expanded(
                    child: ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                              context, CustomRoute(const Example02()));
                        },
                        child: const Text('Example02')),
                  ),
                  const Padding(padding: EdgeInsets.fromLTRB(0, 0, 16.0, 0)),
                  Expanded(
                    child: ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                              context, CustomRoute(const FirstPage()));
                        },
                        child: const Text('example03')),
                  ),
                  // const Padding(padding: EdgeInsets.fromLTRB(0, 0, 16.0, 0)),
                ],
              ),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(context, CustomRoute(const Demo04()));
                      },
                      child: const Text('example04'),
                    ),
                  ),
                  const Padding(padding: EdgeInsets.fromLTRB(0, 0, 16.0, 0)),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(context, CustomRoute(const Example05()));
                      },
                      child: const Text('example05'),
                    ),
                  ),
                  const Padding(padding: EdgeInsets.fromLTRB(0, 0, 16.0, 0)),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                            context, CustomRoute(const Example0501()));
                      },
                      child: const Text('example05_01'),
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  Expanded(
                      child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(context, CustomRoute(const Example06()));
                    },
                    child: const Text('Example06'),
                  ))
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
      ),
    );
  }
}
