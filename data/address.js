// 地址数组(包含所有用户关联的配送地址信息，一个用户可以同时包含多个送货地址，多个地址中可能最多有一个是默认地址,isDefault标识每个地址是否是默认地址)
var address = [
	{ id: 1, uName: 'user1', receiveName: '刘琪', receiveTel: '13555555555', receiveZip:555555, receiveRegion: '山东省烟台市招远市夏甸镇', receiveAddress: '大庄子村', isDefault: false }, 
	{ id: 2, uName: 'user1', receiveName: '杨珊珊', receiveTel: '13666666666', receiveZip:666666, receiveRegion: '山东省 泰安市 岱岳区 夏张镇', receiveAddress: '郝家宅村', isDefault: true },
	{ id: 3, uName: 'user1', receiveName: '周晓晴', receiveTel: '13777777777', receiveZip:777777, receiveRegion: '山东省 潍坊市 坊子区 黄旗堡街道', receiveAddress: '小庄科村', isDefault: false },
	{ id: 4, uName: 'user2', receiveName: '焦守超', receiveTel: '13888888888', receiveZip:888888, receiveRegion: '山东省 青岛市 李沧区 虎山路', receiveAddress: '蓝山湾三期1号楼1单元1号', isDefault: false },
	{ id: 5, uName: 'user3', receiveName: '江文超', receiveTel: '13999999999', receiveZip:999999, receiveRegion: '北京市 朝阳区', receiveAddress: '西三旗', isDefault: false },
	{ id: 5, uName: 'user4', receiveName: '江文超', receiveTel: '13999999999', receiveZip:999999, receiveRegion: '北京市 朝阳区', receiveAddress: '西三旗', isDefault: false },
	{ id: 5, uName: 'user5', receiveName: '江文超', receiveTel: '13999999999', receiveZip:999999, receiveRegion: '北京市 朝阳区', receiveAddress: '西三旗', isDefault: false }
];