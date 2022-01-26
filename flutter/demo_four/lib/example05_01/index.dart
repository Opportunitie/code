import 'package:flutter/material.dart';
import 'keep_alive_demo.dart';

class Example0501 extends StatelessWidget {
  const Example0501({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("State"),
      ),
      body: const KeepAliveDemo(),
    );
  }
}

class KeepAliveDemo extends StatefulWidget {
  const KeepAliveDemo({Key? key}) : super(key: key);
  @override
  _KeepAliveDemoState createState() => _KeepAliveDemoState();
}

class _KeepAliveDemoState extends State<KeepAliveDemo>
    with SingleTickerProviderStateMixin {
  late TabController _controller;
  @override
  void initState() {
    _controller = TabController(length: 4, vsync: this);
    super.initState();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Keep Alive Demo-TabBar"),
        bottom: TabBar(
          controller: _controller,
          tabs: const [
            Tab(icon: Icon(Icons.directions_car)),
            Tab(icon: Icon(Icons.directions_transit)),
            Tab(icon: Icon(Icons.directions_bike)),
            Tab(icon: Icon(Icons.directions_boat)),
          ],
        ),
      ),
      body: TabBarView(controller: _controller, children: const [
        MyHomePage(),
        MyHomePage(),
        MyHomePage(),
        MyHomePage(),
      ]),
    );
  }
}
