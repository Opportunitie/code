import 'package:flutter/material.dart';

import 'pages/home_screen.dart';
import 'pages/email-screen.dart';
import 'pages/pages_screen.dart';
import 'pages/airplay_screen.dart';

class BottomNavigationWidget extends StatefulWidget {
  const BottomNavigationWidget({Key? key}) : super(key: key);

  @override
  _BottomNavigationWidgetState createState() => _BottomNavigationWidgetState();
}

class _BottomNavigationWidgetState extends State<BottomNavigationWidget> {
  final bottomNavigationColor = Colors.blue;
  int currentIndex = 0;
  List<Widget> list = <Widget>[];

  @override
  void initState() {
    list
      ..add(const HomeScreen())
      ..add(const EmailScreen())
      ..add(const PagesScreen())
      ..add(const Airplay());
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: list[currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
              icon: Icon(
                Icons.home,
                color: bottomNavigationColor,
              ),
              title: Text(
                "Home",
                style: TextStyle(color: bottomNavigationColor),
              )),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.email,
                color: bottomNavigationColor,
              ),
              title: Text(
                "Email",
                style: TextStyle(color: bottomNavigationColor),
              )),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.pages,
                color: bottomNavigationColor,
              ),
              title: Text(
                "Pages",
                style: TextStyle(color: bottomNavigationColor),
              )),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.airplay,
                color: bottomNavigationColor,
              ),
              title: Text(
                "Airpaly",
                style: TextStyle(color: bottomNavigationColor),
              )),
        ],
        currentIndex: currentIndex,
        onTap: (int index) {
          setState(() {
            currentIndex = index;
          });
        },
      ),
    );
  }
}
