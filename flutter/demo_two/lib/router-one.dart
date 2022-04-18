import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(title: "导航演示01", home: FirstScreen()));
}

class FirstScreen extends StatelessWidget {
  const FirstScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("导航组件"),
      ),
      body: Center(
        child: RaisedButton(
          child: const Text("查看商品详情页"),
          onPressed: () => {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => const SecondScreen()))
          },
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  const SecondScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("商品详情页"),
      ),
      body: Center(
        child: RaisedButton(
          child: const Text("返回"),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}