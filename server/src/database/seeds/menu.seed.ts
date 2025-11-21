import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { MenuCategory } from '../../menu_categories/entities/menu_category.entity';
import { Menu } from '../../menus/entities/menu.entity';
import { MenuTranslation } from '../../menu_translations/entities/menu_translation.entity';

export default class MenuSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const catRepo = dataSource.getRepository(MenuCategory);
    const menuRepo = dataSource.getRepository(Menu);
    const transRepo = dataSource.getRepository(MenuTranslation);

    const tenantId = '1';

    const categories = await catRepo.save([
      { tenantId, name: 'Burgers', displayOrder: 1, isActive: true },
      { tenantId, name: 'Drinks', displayOrder: 2, isActive: true },
      { tenantId, name: 'Pasta', displayOrder: 3, isActive: true },
      { tenantId, name: 'Desserts', displayOrder: 4, isActive: true },
      { tenantId, name: 'Sides', displayOrder: 5, isActive: true }
    ]);

    const menus = await menuRepo.save([
      {
        tenantId,
        categoryId: categories[0].id,
        sku: 'BRG-001',
        name: 'Classic Burger',
        description: 'A juicy beef patty grilled to perfection, served with fresh vegetables and a lightly toasted bun for a balanced and satisfying flavor.',
        price: '8.99',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[0].id,
        sku: 'BRG-002',
        name: 'Cheese Burger',
        description: 'A rich and flavorful burger topped with melted cheddar cheese, crisp lettuce, onions, and creamy house sauce.',
        price: '9.49',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[0].id,
        sku: 'BRG-003',
        name: 'Double Burger',
        description: 'Two thick, seasoned beef patties layered with cheese and savory sauce, delivering a hearty and indulgent bite.',
        price: '11.99',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[1].id,
        sku: 'DRK-001',
        name: 'Cola',
        description: 'A refreshing carbonated cola beverage served ice cold for a crisp and energizing taste.',
        price: '1.99',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[1].id,
        sku: 'DRK-002',
        name: 'Orange Juice',
        description: 'Freshly squeezed orange juice with bright citrus notes and natural sweetness.',
        price: '2.99',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[2].id,
        sku: 'PST-001',
        name: 'Spaghetti',
        description: 'Classic spaghetti tossed in a rich tomato sauce infused with herbs, garlic, and olive oil.',
        price: '7.49',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[2].id,
        sku: 'PST-002',
        name: 'Chicken Alfredo',
        description: 'Creamy Alfredo pasta featuring grilled chicken, parmesan cheese, and a smooth buttery sauce.',
        price: '9.99',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[3].id,
        sku: 'DES-001',
        name: 'Cheesecake',
        description: 'Velvety cheesecake with a delicate cream texture and a buttery graham cracker crust.',
        price: '4.99',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[3].id,
        sku: 'DES-002',
        name: 'Chocolate Cake',
        description: 'A moist and rich chocolate cake layered with smooth chocolate frosting and a deep cocoa aroma.',
        price: '5.49',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[4].id,
        sku: 'SID-001',
        name: 'French Fries',
        description: 'Crispy, golden fries lightly seasoned with salt, offering a crunchy exterior and fluffy interior.',
        price: '2.49',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[4].id,
        sku: 'SID-002',
        name: 'Onion Rings',
        description: 'Thick onion slices coated in seasoned batter and fried until perfectly crisp.',
        price: '2.99',
        isAvailable: true,
        isActive: true
      },
      {
        tenantId,
        categoryId: categories[4].id,
        sku: 'SID-003',
        name: 'Garlic Bread',
        description: 'Warm toasted bread brushed with garlic butter, herbs, and a touch of parmesan.',
        price: '3.49',
        isAvailable: true,
        isActive: true
      }
    ]);

    const jpNames = [
      'クラシックバーガー',
      'チーズバーガー',
      'ダブルバーガー',
      'コーラ',
      'オレンジジュース',
      'スパゲッティ',
      'チキンアルフレード',
      'チーズケーキ',
      'チョコレートケーキ',
      'フライドポテト',
      'オニオンリング',
      'ガーリックブレッド'
    ];

    const thNames = [
      'คลาสสิกเบอร์เกอร์',
      'ชีสเบอร์เกอร์',
      'ดับเบิลเบอร์เกอร์',
      'โคล่า',
      'น้ำส้ม',
      'สปาเก็ตตี้',
      'ไก่อัลเฟรโด',
      'ชีสเค้ก',
      'ช็อกโกแลตเค้ก',
      'เฟรนช์ฟรายส์',
      'ออเนียนริงส์',
      'ขนมปังกระเทียม'
    ];

    const jpDesc = [
      'ジューシーなビーフパティを香ばしく焼き上げ、新鮮な野菜と軽くトーストしたバンズで仕上げた、バランスの取れた満足感のあるバーガーです。',
      '濃厚なチェダーチーズをたっぷりとのせ、新鮮な野菜とクリーミーなソースを合わせた風味豊かなバーガーです。',
      '2枚の肉厚ビーフパティとチーズを重ね、香ばしいオニオンと旨味たっぷりのソースで仕上げた食べ応え抜群のバーガーです。',
      'キリッとした甘さと爽快感が特徴の清涼感あふれるコーラです。',
      '自然な甘みと爽やかな酸味が際立つ、しぼりたてのオレンジジュースです。',
      'ハーブとガーリックが効いた濃厚なトマトソースで仕上げた、クラシックなスパゲッティです。',
      'バターとパルメザンが香るクリーミーなソースに、グリルチキンを合わせたアルフレードパスタです。',
      'なめらかな口溶けとバター香る土台が特徴の、上品でクリーミーなチーズケーキです。',
      'しっとりとした生地と濃厚なチョコレートクリームが楽しめるリッチなチョコレートケーキです。',
      '外はカリッと中はホクホクに仕上げた、シンプルで飽きのこないフライドポテトです。',
      '厚切りオニオンを風味豊かな衣で包み、サクサクに揚げたオニオンリングです。',
      'ガーリックバターとハーブの香りが広がる、香ばしくトーストしたガーリックブレッドです。'
    ];

    const thDesc = [
      'เนื้อวัวชุ่มฉ่ำย่างจนหอม จับคู่กับผักสดและขนมปังอบอุ่น มอบรสชาติที่สมดุลและน่าพึงพอใจในทุกคำ',
      'เบอร์เกอร์เนื้อรสเข้มข้นโรยด้วยเชดดาร์ชีส ผักสด และซอสครีม เพิ่มรสชาติที่กลมกล่อมยิ่งขึ้น',
      'ดับเบิลความอร่อยด้วยเนื้อบดสองชั้น ชีสสองชั้น และซอสเข้มข้น ให้รสชาติเต็มคำแบบจุใจ',
      'น้ำอัดลมโคล่ารสหวานซ่า สดชื่น ดื่มแล้วรู้สึกกระปรี้กระเปร่า',
      'น้ำส้มคั้นสดที่มีกลิ่นหอม รสหวานอมเปรี้ยว ดื่มง่ายและสดชื่น',
      'สปาเก็ตตี้คลาสสิกคลุกซอสมะเขือเทศเข้มข้นผสมสมุนไพรและกระเทียม หอมอร่อยลงตัว',
      'พาสต้าซอสอัลเฟรโดครีมมี่ เข้มข้นด้วยเนยและพาร์เมซาน เสิร์ฟพร้อมไก่อบหอมๆ',
      'ชีสเค้กเนื้อนุ่มละมุน ฐานแครกเกอร์เนยหอมกรอบ รสชาติกลมกล่อมกำลังดี',
      'ช็อกโกแลตเค้กเนื้อนุ่มชุ่มฉ่ำ รสโกโก้เข้มข้น พร้อมครีมช็อกโกแลตเนียนละมุน',
      'เฟรนช์ฟรายส์กรอบนอกนุ่มใน โรยเกลือเล็กน้อย อร่อยเพลินกินง่าย',
      'หัวหอมชิ้นหนาชุบแป้งสูตรพิเศษทอดจนกรอบ หอมอร่อยทุกคำ',
      'ขนมปังอบทาเนยกระเทียม โรยสมุนไพรหอมๆ พร้อมชีสเล็กน้อย เพิ่มรสชาติกลมกล่อม'
    ];

    const translations: Partial<MenuTranslation>[] = [];

    menus.forEach((menu, i) => {
      translations.push(
        {
          menuId: menu.id,
          languageCode: 'en',
          name: menu.name,
          description: menu.description
        },
        {
          menuId: menu.id,
          languageCode: 'jp',
          name: jpNames[i],
          description: jpDesc[i]
        },
        {
          menuId: menu.id,
          languageCode: 'th',
          name: thNames[i],
          description: thDesc[i]
        }
      );
    });

    await transRepo.save(translations);
  }
}
