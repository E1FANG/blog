import Addres from 'js/addressService.js'

export default {
    data() {
        return {
            name: '',
            tel: '',
            provinceValue: -1,
            cityValue: -1,
            districtValue: -1,
            address: '',
            id: '',
            type: '',
            instance: '',
            addressData: require('js/address.json'),
            cityList: null,
            districtList: null,
        }
    },
    computed: {
        lists(){
            return this.$store.state.lists
        }
    },
    created() {
        let query = this.$route.query
        this.type = query.type
        this.instance = query.instance


        //编辑状态时，输入栏的数据是路由传来的 
        //拿到之后，修改province的值，watch到就会修改其他的值
        if (this.type === 'edit') {
            let ad = this.instance
            this.provinceValue = parseInt(this.instance.provinceValue)
            this.name = ad.name
            this.tel = ad.tel
            this.addres = ad.address
            this.id = ad.id
        }
    },
    methods: {
        add() {
            //需要做非空和合法性校验
            let { name, tel, provinceValue, cityValue, districtValue, address } = this
            let data = { name, tel, provinceValue, cityValue, districtValue, address }

            if (this.type === 'add') {
                // Addres.add(data).then(res => {
                //     this.$router.go(-1)
                // })
                this.$store.dispatch('addAction', data)
                // .then(() => {
                //     this.lists = this.$store.state.lists
                //     this.$router.go(-1)
                // })
            }
            if (this.type === 'edit') {
                data.id = this.id
                // Addres.update(data).then(res => {
                //     this.$router.go(-1)
                // })
                this.$store.dispatch('updateAction', data)
            }
        },
        remove() {
            //调用原生的ios或安卓的删除弹窗
            if (window.confirm('确认删除？')) {
                // Addres.remove(this.id).then(res => {
                //     this.$router.go(-1)
                // })
                this.$store.dispatch('removeAction', this.id)
            }
        },
        setDefault() {
            // Addres.setDefault(this.id).then(res => {
            //     this.$router.go(-1)
            // })
            this.$store.dispatch('setDefaultAction', this.id)
        }
    },
    watch: {
        lists:{
            handler(){
                this.$router.go(-1)
            },
            deep:true
        },
        provinceValue(val) {
            if (val === -1) return
            let list = this.addressData.list
            let index = list.findIndex(item => {
                return item.value === val
            })
            this.cityList = list[index].children
            // console.log(typeof(list[index].children))
            //选择后将后面的选项变回原始状态
            this.cityValue = -1
            this.districtValue = -1

            if (this.type === 'edit') {
                this.cityValue = parseInt(this.instance.cityValue)
            }
        },
        cityValue(val) {
            console.log(val)
            if (val === -1) return
            let list = this.cityList
            let index = list.findIndex(item => {
                return item.value === val
            })
            this.districtList = list[index].children
            this.districtValue = -1

            if (this.type === 'edit') {
                this.districtValue = parseInt(this.instance.districtValue)
            }
        }
    },
}