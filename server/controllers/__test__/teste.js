import { By, Key, Builder } from "selenium-webdriver";
import "chromedriver";

async function test_case(){
    //teste de nome invalido
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/livro/");

    await driver.findElement(By.name("nomeBuscado")).sendKeys("livro nao cadastrado", Key.RETURN);


}

async function test_case2(){
    //teste de nome válido
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/livro/");

    await driver.findElement(By.name("nomeBuscado")).sendKeys("O pequeno principe", Key.RETURN);
}


async function test_case3(){
    //teste de deletar livro
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/livro/");

    await driver.findElement(By.name("nomeBuscado")).sendKeys("O pequeno principe", Key.RETURN);
    await driver.sleep(5000);
    
    await driver.findElement(By.id('deleteButton')).click();


    await botao.click();

    setInterval(function(){
        driver.quit();
    }, 10000);
}

test_case();
test_case2();