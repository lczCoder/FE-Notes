const Animal = {
  name: "",
  age: 0,
  color: "",
};
(function () {
  function CreateCat(name, age, color) {
    this.name = name;
    this.age = age;
    this.color = color;
    this.cry = "喵喵喵";
  }
  let cat = new CreateCat("小黑", 3, "black");
  console.log("cat", cat);

  function CreateDog(name, age, color) {
    this.name = name;
    this.age = age;
    this.color = color;
    this.cry = "汪汪汪";
  }
  let dog = new CreateDog("小黄", 2, "yellow");
  console.log("cat", dog);
});

// 第一种改进方式
(function () {
  function CreateAnimal(name, age, color, type, cry) {
    this.name = name;
    this.age = age;
    this.color = color;
    this.type = type;
    this.cry = cry;
  }
  function Factory(name, age, color, type) {
    let cry = "";
    switch (type) {
      case "cat":
        cry = "喵喵喵";
        break;
      case "dog":
        cry = "汪汪汪";
        break;
    }
    console.log("cry", cry);
    return new CreateAnimal(name, age, color, type, cry);
  }
  const animal = new Factory("小白", 3, "while", "cat");
  console.log("animal", animal);
});

/**
 * 优点：把动物的叫声进行了一个封装，只需要传入动物的种类，就能自动归纳动物的叫声，而不需要额外的再去进行处理
 */

// 抽象类
// 手机类
class MobilePhone {
  // 屏幕生成
  createScreen() {
    throw new Error("我是生产屏幕的抽象，不要直接调用我");
  }
  // 操作系统生成
  createOs() {
    throw new Error("我是生产操作系统的抽象，不要直接调用我");
  }
}
// 操作系统类
class Os {
  oskey = 'os'
  controlOs() {
    throw new Error("我是操作系统类型的抽象，不要直接调用我");
  }
}
class AndriodOs extends Os {
  controlOs() {
    console.log("使用安卓系统",this.oskey);
  }
}
class IosOs extends Os {
  controlOs() {
    console.log("使用苹果系统",this.oskey);
  }
}
// 屏幕的抽象类
class Screen {
  controlScreen() {
    throw new Error("我是屏幕的抽象，不要直接调用我");
  }
}

class Bend extends Screen {
  controlScreen() {
    console.log("曲面屏");
  }
}

class Direct extends Screen {
  controlScreen() {
    console.log("直面屏");
  }
}

// 华为手机
class HuaweiPhone extends MobilePhone {
  createOs() {
    return new AndriodOs().controlOs();
  }
  createScreen() {
    return new Bend().controlScreen();
  }
  createBattery() {
    console.log("加入一颗电池");
  }
  createPhone() {
    this.createOs();
    this.createScreen();
    this.createBattery();
  }
}

// 苹果手机
class Iphone extends MobilePhone {
  createOs() {
    return new IosOs().controlOs();
  }
  createScreen() {
    return new Direct().controlScreen();
  }
  createBattery() {
    console.log("加入一颗ios专门的电池");
  }
  createPhone() {
    this.createOs();
    this.createScreen();
    this.createBattery();
  }
}

// const phone1 = new HuaweiPhone();
// phone1.createPhone();

// const phone2 = new Iphone();
// phone2.createPhone();

function PhoneFactory(brand) {
  switch (brand) {
    case "huawei":
      return new HuaweiPhone();
      break;
    case "ios":
      return new Iphone();
      break;
  }
}

const phone = new PhoneFactory('ios')
phone.createPhone()


// 华为手机，需要加一个电池
// 小米手机的电池是单独的，和其他牌子不一样

// class Phone {
//   constructor(os, hardware) {
//     this.os = os;
//     this.hardware = hardware;
//   }
//   createOs(os) {
//     console.log(`使用${os}的操作系统`);
//   }
//   createHardware(hardware) {
//     console.log(`使用${hardware}的系统`);
//   }
//   createBattery(hardware) {
//     if (hardware === "xiaomi") {
//       console.log("单独加入一个小米电池");
//     } else {
//       console.log("加入一个电池");
//     }
//   }
//   createPhone() {
//     this.createOs(this.os);
//     this.createHardware(this.hardware)
//     if(this.hardware=='xiaomi' || this.hardware =='huawei') {
//       this.createBattery(this.hardware);
//     }
//   }
// }

// const xx = new Phone("ios", "kk");
// xx.createPhone();

// 华为手机，需要加一个电池
// 小米手机的电池是单独的，和其他牌子不一样
