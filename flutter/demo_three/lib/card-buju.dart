import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    var card = Card(
      child: Column(
        children: const [
          ListTile(
            title: Text(
              "湖北省麻城市白果镇",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            subtitle: Text("小王：18188888888"),
            leading: Icon(
              Icons.account_box,
              color: Colors.lightBlue,
            ),
          ),
          Divider(),
          ListTile(
            title: Text(
              "北京市海淀区清华大学",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            subtitle: Text("小红：18188888866"),
            leading: Icon(
              Icons.account_box,
              color: Colors.lightBlue,
            ),
          ),
          Divider(),
          ListTile(
            title: Text(
              "湖北省武汉市华中科技大学",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            subtitle: Text("小李：18188888811"),
            leading: Icon(
              Icons.account_box,
              color: Colors.lightBlue,
            ),
          ),
        ],
      ),
    );
    return MaterialApp(
        title: "Row Widget Demo",
        home: Scaffold(
          appBar: AppBar(
            title: const Text("垂直方向布局"),
          ),
          body: Center(
            child: card,
          ),
        ));
  }
}
