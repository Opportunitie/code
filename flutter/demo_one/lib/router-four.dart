import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(
    title: "页面跳转返回数据",
    home: FirstPage(),
  ));
}

class FirstPage extends StatelessWidget {
  const FirstPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("找小姐姐要电话"),
        ),
        body: const Center(
          child: RouteButton(),
        ));
  }
}

class RouteButton extends StatelessWidget {
  const RouteButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: () {
        _navigateToXioaJieJie(context);
      },
      child: const Text("去找小姐姐"),
    );
  }
}

_navigateToXioaJieJie(BuildContext context) async {
  final result = await Navigator.push(
      context, MaterialPageRoute(builder: (context) => const XiaoJieJie()));
  Scaffold.of(context).showSnackBar(SnackBar(content: Text(result)));
}

class XiaoJieJie extends StatelessWidget {
  const XiaoJieJie({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("小姐姐"),
      ),
      body: Center(
        child: Column(
          children: [
            RaisedButton(
              onPressed: () {
                Navigator.pop(context, "1号小姐姐：18166668888");
              },
              child: const Text("1号小姐姐"),
            ),
            RaisedButton(
              onPressed: () {
                Navigator.pop(context, "2号小姐姐：18166668888");
              },
              child: const Text("2号小姐姐"),
            ),
            RaisedButton(
              onPressed: () {
                Navigator.pop(context, "3号小姐姐：18166668888");
              },
              child: const Text("3号小姐姐"),
            ),
          ],
        ),
      ),
    );
  }
}
