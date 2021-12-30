import "package:flutter/material.dart";

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Row Widget Demo",
      home: Scaffold(
        appBar: AppBar(
          title: const Text("水平方向布局"),
        ),
        body: Row(
          children: [
            Expanded(
              child: RaisedButton(
                onPressed: () {},
                color: Colors.orangeAccent,
                child: const Text("Orange Button"),
              ),
            ),
            RaisedButton(
              onPressed: () {},
              color: Colors.redAccent,
              child: const Text("Red Button"),
            ),
            RaisedButton(
              onPressed: () {},
              color: Colors.blueAccent,
              child: const Text("Blue Button"),
            ),
            Expanded(
              child: RaisedButton(
                onPressed: () {},
                color: Colors.blueAccent[100],
                child: const Text("Blue Button"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
