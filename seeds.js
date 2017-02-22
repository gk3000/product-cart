var server = require('controllers/server');

var data = [
    {
        name: 'Flatcamp',
        image: 'http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget rutrum leo. Curabitur molestie sollicitudin massa. Pellentesque placerat fermentum porta. Integer quam nibh, commodo quis facilisis a, aliquam eget enim. In dui nunc, consequat in finibus eget, porta non erat. Donec scelerisque suscipit sem, eget fringilla sapien imperdiet et. Suspendisse scelerisque leo ac maximus tempus.'
    },
    {
        name: 'Vancamp',
        image: 'http://www.fondulacpark.com/wp-content/uploads/2015/01/campground-pic-1.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget rutrum leo. Curabitur molestie sollicitudin massa. Pellentesque placerat fermentum porta. Integer quam nibh, commodo quis facilisis a, aliquam eget enim. In dui nunc, consequat in finibus eget, porta non erat. Donec scelerisque suscipit sem, eget fringilla sapien imperdiet et. Suspendisse scelerisque leo ac maximus tempus.'
    },
    {
        name: 'Treecamp',
        image: 'https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget rutrum leo. Curabitur molestie sollicitudin massa. Pellentesque placerat fermentum porta. Integer quam nibh, commodo quis facilisis a, aliquam eget enim. In dui nunc, consequat in finibus eget, porta non erat. Donec scelerisque suscipit sem, eget fringilla sapien imperdiet et. Suspendisse scelerisque leo ac maximus tempus.'
    }
]
    
function seedDB() {
    // remove all campgrounds
    Campground.remove({}, err => {
        if (err) {
            console.log(err)
        } else {
            console.log('removed campgrounds!')
            // add a few campgrounds
            data.forEach(campground => {
                Campground.create(campground, (err, campground) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('added a campground!')
                        // create a comment
                        Comment.create({
                            text: "It's pretty, but there's no fuckin internet.",
                            author: 'Grouchycat'
                        }, (err, comment) => {
                            if (err) {
                                console.log(err)
                            } else {
                            campground.comments.push(comment)
                            campground.save()
                            console.log('created new comment!')
                            }
                        })
                    }
                })
            })
        }
    })
}

module.exports = seedDB