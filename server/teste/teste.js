import { By, Key, Builder } from "selenium-webdriver";
import "chromedriver";

async function test_case(){
    //teste de nome invalido
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/livro/");

    await driver.findElement(By.name("nomeBuscado")).sendKeys("livro nao cadastrado", Key.RETURN);
    await driver.sleep(4000);
    test_case2();
}

async function test_case2(){
    //teste de nome válido
    
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/livro/");

    await driver.findElement(By.name("nomeBuscado")).sendKeys("O pequeno principe", Key.RETURN);
    await driver.sleep(5000);
    test_case3();
}


async function test_case3(){
    //teste de cadasrar livro existente
    
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/livro/");

    await driver.findElement(By.name("nome")).sendKeys("O pequeno principe");
    await driver.sleep(2000);
    await driver.findElement(By.name("autor")).sendKeys("um autor");
    await driver.sleep(2000);
    await driver.findElement(By.name("editora")).sendKeys(1, Key.RETURN);

    setInterval(function(){
        driver.quit();
    }, 10000);
}

test_case();

